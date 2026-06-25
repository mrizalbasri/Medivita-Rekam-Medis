/**
 * Memformat CUID database yang panjang menjadi format ID numerik yang bersih untuk UI.
 * Contoh: "cmqsg1xju0002w1b4yt4gs603" -> "0492-8172"
 */
export function formatDisplayId(id: string): string {
  if (!id) return "-";
  
  // Jika ID sudah dalam bentuk angka / format lain, kembalikan langsung
  if (/^\d+$/.test(id)) return id;
  
  // Sederhana: lakukan hashing string CUID menjadi angka positif
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const numeric = Math.abs(hash).toString();
  const formatted = numeric.slice(0, 8).padStart(8, "0");
  
  // Format menjadi XXXX-XXXX agar rapi dibaca di UI
  return `${formatted.slice(0, 4)}-${formatted.slice(4)}`;
}
