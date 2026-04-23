# Data Sekolah Indonesia

REST API untuk mempermudah pencarian dan pengambilan data sekolah di Indonesia.

## Fitur

* 55.000+ data sekolah
* Detail sekolah
* Pencarian wilayah
* Daftar bentuk pendidikan

---

## Endpoint: /sekolah

**Method**: `GET`
> Mengambil daftar sekolah berdasarkan parameter pencarian dan filter.

## Parameter

| Nama              | Tipe   | Wajib | Default | Deskripsi                            | Sumber Data                        |
| ----------------- | ------ | ----- | ------- | ------------------------------------ | ---------------------------------- |
| keyword           | string | Tidak | ""      | Kata kunci pencarian nama sekolah    | Input bebas                        |
| kabupaten_kota    | string | Tidak | ""      | Nama kabupaten/kota                  | Dari endpoint `/wilayah`           |
| bentuk_pendidikan | string | Tidak | ""      | Jenjang pendidikan                   | Dari endpoint `/bentuk-pendidikan` |
| status_sekolah    | string | Tidak | ""      | Status sekolah                       | NEGERI / SWASTA                    |
| page              | number | Tidak | 0       | Nomor halaman                        | Internal                           |
| size              | number | Tidak | 12      | Jumlah data per halaman (12, 24, 48) | Internal                           |

#### Contoh Request

```
GET /sekolah?kabupaten_kota=Kota Tangerang Selatan&bentuk_pendidikan=SMK&status_sekolah=NEGERI&page=0&size=12
```

#### Catatan

* Parameter `kabupaten_kota` harus diambil dari hasil endpoint `/wilayah`.
* Parameter `bentuk_pendidikan` harus diambil dari hasil endpoint `/bentuk-pendidikan`.

---

## Endpoint: /wilayah

**Method**: `GET`

Digunakan untuk mencari data wilayah (provinsi dan kabupaten/kota).
Endpoint ini berfungsi sebagai referensi untuk parameter pada endpoint `/sekolah`.

#### Parameter

| Nama    | Tipe   | Wajib | Deskripsi                    |
| ------- | ------ | ----- | ---------------------------- |
| keyword | string | Ya    | Kata kunci pencarian wilayah |

#### Aturan Penggunaan

* Parameter `keyword` **wajib diisi**.
* Tidak diperbolehkan mengirim `keyword` kosong.
* Gunakan nama wilayah yang relevan (misalnya nama provinsi atau kabupaten).

#### Output Penting

| Field     | Deskripsi           |
| --------- | ------------------- |
| provinsi  | Nama provinsi       |
| kabupaten | Nama kabupaten/kota |

#### Contoh Request

```http id="v9u2gx"
GET /wilayah?keyword=Banten
```

#### Catatan

* Gunakan nilai `kabupaten` dari hasil response sebagai parameter `kabupaten_kota` pada endpoint `/sekolah`.
* Endpoint ini hanya untuk pencarian referensi, bukan untuk filtering langsung data sekolah.

---

## Endpoint: /bentuk-pendidikan

**Method**: `GET`
> Mengambil daftar bentuk atau jenjang pendidikan.
Digunakan sebagai referensi untuk parameter pada endpoint `/sekolah`.

#### Parameter

Tidak ada parameter.

#### Output Penting

| Field | Deskripsi               |
| ----- | ----------------------- |
| nama  | Nama jenjang pendidikan |

#### Contoh Request

```
GET /bentuk-pendidikan
```

#### Catatan

* Gunakan field `nama` sebagai nilai `bentuk_pendidikan` pada endpoint `/sekolah`.

---

## Endpoint: /sekolah/:id

**Method**: `GET`
> Mengambil detail lengkap sekolah berdasarkan `sekolah_id`.

#### Parameter

| Nama | Tipe   | Wajib | Deskripsi       | Sumber Data     |
| ---- | ------ | ----- | --------------- | --------------- |
| id   | string | Ya    | ID unik sekolah | Dari `/sekolah` |

#### Contoh Request

```
GET /sekolah/03D6CC94-B13D-487B-B1C8-90ADE5D42D4F
```

---

## Alur Penggunaan

1. Cari wilayah

   ```
   GET /wilayah?keyword=Banten
   ```

2. Pilih nilai `kabupaten` dari hasil response

3. Ambil daftar bentuk pendidikan

   ```
   GET /bentuk-pendidikan
   ```

4. Gunakan parameter tersebut untuk mencari sekolah

   ```
   GET /sekolah?kabupaten_kota=Kota Tangerang Selatan&bentuk_pendidikan=SMK
   ```

5. Ambil `sekolah_id` dari hasil pencarian

6. Ambil detail sekolah

   ```
   GET /sekolah/{sekolah_id}
   ```

---

## Prinsip Penggunaan

* Endpoint `/wilayah` dan `/bentuk-pendidikan` adalah sumber referensi.
* Parameter pada `/sekolah` sebaiknya tidak diisi manual tanpa referensi.
* Gunakan data hasil endpoint referensi untuk menjaga konsistensi dan validitas data.

---

## Sumber

Data terbuka dari kemendikdasmen.go.id
