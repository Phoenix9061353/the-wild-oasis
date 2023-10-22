import supabase, { supabaseUrl } from './supabase';
export default async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded!');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  //檢查在表單內的file部分是啥（新檔案 → file, 舊檔案 → path）
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //圖片儲存至supabase時，在table內是存path
  //因為supabase碰上名字裡有'/'時，會將其判定為要建立一個資料夾，所以要取代掉
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create / Edit cabin
  let query = supabase.from('cabins');

  // A) Create（非編輯模式(無指定id)）
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      'Cabins could not be created!(There was some problem with creating cabin)'
    );
  }

  // 2. Upload image(如果之前已經上傳過相同圖片，則不重複上傳)
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabins could not be created!(Cabin image could not be uploaded)'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted!');
  }
}
