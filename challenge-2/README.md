# Batha Challenge #2 - Implement Newsletter Template

Selamat atas keberhasilannya dalam melewati Batha Challenge #1!

Kalian bisa berhasil sampai ke tahap ini karena desain kalian dalam challenge sebelumnya sudah sesuai dengan standar kualitas yang kami mau, atau dengan kata lain desain kalian memang keren. 😁

- [Overview Challenge](#overview-challenge)
- [Cara Menguji](#cara-menguji)
- [Pengumpulan Tugas](#pengumpulan-tugas)

## Overview Challenge

Nah di challenge kali ini tugas kalian adalah mengimplementasikan desain kalian di challenge sebelumnya ke dalam kode html & css yang bisa ditampilkan dengan baik di Gmail baik di desktop dengan menggunakan browser ataupun di mobile dengan menggunakan Gmail app.

Nah nggak semua kode html & css bisa ditampilkan dengan baik di Gmail, hanya kode dengan inline styling saja yang bisa ditampilkan dengan baik dan itupun fiturnya cukup terbatas.

Misalnya kita ingin menampilkan tampilan dengan struktur sebagai berikut:

```
Hello World! // kita ingin warna teks ini hijau
<image>
```

Dengan menggunakan kode standar html kita bisa membuat tampilan diatas dengan kode berikut:

```html
<html>
    <style>
        h1 { color: green; }
    </style>
    <body>
        <h1>Hello World!</h1>
        <img src="https://batha-static.s3-ap-southeast-1.amazonaws.com/logos/stripe.jpeg"/>
    </body>
</html>
```

Namun sayangnya styling dari kode diatas tidak akan ditampilkan dengan baik. Hal ini disebabkan karena warna dari `Hello World` tidak akan berubah menjadi hijau seperti yang kita inginkan.

Lalu bagaimana supaya styling-nya bekerja? Kita perlu merubah kode diatas menjadi kode berikut:

```html
<h1 style="color: green;">Hello World!</h1>
<img src="https://batha-static.s3-ap-southeast-1.amazonaws.com/logos/stripe.jpeg"/>
```

## Cara Menguji

Kalian tentu perlu menguji apakah kode html & css kalian berjalan dengan baik atau tidak kan ya?

Nah untuk mengujinya tentu kalian harus bisa mengirim email dalam format html kan ya? Dan untuk melakukan hal ini kalian perlu menggunakan email server.

Nah kami sudah menyiapkan email server yang bisa kalian gunakan untuk melakukan pengujian kode html ini. Selain untuk mengirimkan email, server ini juga bisa kalian gunakan untuk mengupload assets yang kalian perlukan untuk kode kalian.

Untuk tutorial penggunaan servernya bisa diakses di link berikut:

<TODO: link>

## Pengumpulan Tugas

Deliverable yang diharapkan dalam tugas kali ini adalah sebuah `index.html` yang berisi kode html dan css yang bisa ditampilkan dengan baik di Gmail.

Kalau kalian mengumpulkan format selain dengan format yang telah ditentukan semisal *.svg, *.pdf, atau format yang lain, maka otomatis hasil karya kalian akan didiskualifikasi.

Untuk mengumpulkan deliverable-nya, kalian cukup mengirimkan email ke `riandy@batha.id` beserta deliverable kalian di attachment sebelum `Ahad, 3 Januari 2020 23:59 WIB`.

Kalau kalian ada pertanyaan mengenai challenge kali ini jangan ragu untuk mengirimkan email ke `riandy@batha.id`. Namun tolong expect 1-2 hari untuk mendapatkan balasannya ya. 😁

Selamat mengerjakan tugasnya!