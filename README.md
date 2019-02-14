# Readme

> Input Mask bebas berbasis React

![react-freemask](https://github.com/frenyaif/react-freemask/raw/master/demo.gif)

`FreeMask` hanyalah komponen yang menampilkan bidang isian yang serupa dengan Input Mask yang banyak dipahami. Tidak seperti Input Mask, `FreeMask` tidak (atau belum) menyediakan penanganan dalam penulisan, pengguna bebas menulis sesuai pola yang dibentuk oleh `FreeMask`.

`FreeMask` akan lebih efektif digunakan pada kasus isian berpola, namun tidak ketat, misalnya:

```
... mm > ... minggu
```

Maka pengguna bebas menuliskan isian `minggu` dengan `1` atau `satu`.

Lihat demonya di <a href="https://react-freemask.netlify.com" target="_blank">Storybook</a>.

## Pemasangan

```bash
# menggunakan yarn
yarn add react-freemask

# atau dengan menggunakan npm
npm i react-freemask
```

## Penggunaan

### Impor

```jsx
import FreeMask from 'react-freemask';
import 'react-freemask/build/css/react-freemask.min.css';
```

### Render

```jsx
<FreeMask segments={['?size', 'mm']} />

// '?size' artinya isian dengan nama size
// 'mm' artinya teks statis biasa
```

Penggunaan isian bisa digunakan lebih dari satu.

```jsx
<FreeMask segments={['?width', 'x', '?height']} />
```

#### Menggunakan `value` & `onChange`

```jsx
<FreeMask
  segments={['?size', ' mm']}
  value={{ size: '123' }}
  onChange={value => console.log(value)}
/>
```

`value` pada parameter `props.onChange` memiliki format yang sama dengan `props.value`.

#### Menggunakan `onKeyDown`

```jsx
<FreeMask segments={['?size', ' mm']} onKeyDown={e => console.log(e)} />
```

`props.onKeyDown` memiliki sifat yang sama dengan event pada tag `<div>` konvensional.

#### Mengambil nilai dari `FreeMask`

Nilai yang ada pada `FreeMask` bisa diambil dengan cara "konvensional" dalam tipe `string`, yaitu dengan memanfaatkan `ref`.

```jsx
const ref = useRef(null); // fitur Hook pada function component (untuk React >= 16.8)
// atau
const ref = createRef(); // pada class component

<FreeMask
  ref={ref}
  segments={['?size', ' mm']}
  value={{ size: 123 }}
  onChange={() => {}}
/>;

// diambil dengan cara ini
// dan mendapatkan nilai "123 mm"
ref.current.value;
```

Tentu saja, kita harus mengikuti aturan penggunaan `ref` agar bisa digunakan dengan benar, cek [di sini](https://reactjs.org/docs/refs-and-the-dom.html).

### Tema

Secara bawaan, tidak ada tema khusus yang digunakan. Berikut beberapa tema minimalis yang bisa digunakan:

#### Bootstrap

```jsx
// impor tema
import 'react-freemask/build/css/react-freemask.bootstrap.min.css';

// penggunaan
<FreeMask theme="bootstrap" ... />
```

#### Material

```jsx
// impor tema
import 'react-freemask/build/css/react-freemask.material.min.css';

// penggunaan
<FreeMask theme="material" ... />
```

Tentu saja kita bisa menggunakan file `css` tersendiri untuk injeksi style pada komponen, dengan mengimpornya seperti contoh di atas.

## Props

| name      |       type       |       option        | isRequired |
| --------- | :--------------: | :-----------------: | :--------: |
| segments  |      array       |          -          |    true    |
| value     |      object      |          -          |   false    |
| theme     |      string      | bootstrap, material |   false    |
| onChange  | function (value) |          -          |   false    |
| onKeyDown | function (event) |          -          |   false    |

`FreeMask` adalah komponen berbasis `<div>`, sehingga dapat diinjeksikan `props` tambahan, misalnya `style`.

## CDN

Bagi pengguna yang masih menggunakan cara lama, bisa memanfaatkan link CDN di bawah ini.

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://unpkg.com/react-freemask/build/css/react-freemask.min.css"
  crossorigin
/>

<!-- Tema -->
<!-- gunakan saat dibutuhkan -->
<link
  rel="stylesheet"
  href="https://unpkg.com/react-freemask/build/css/react-freemask.bootstrap.min.css"
  crossorigin
/>
<!-- atau -->
<link
  rel="stylesheet"
  href="https://unpkg.com/react-freemask/build/css/react-freemask.material.min.css"
  crossorigin
/>

<!-- Javascript -->
<script
  src="https://unpkg.com/react-freemask/build/js/react-freemask.umd.js"
  crossorigin
></script>
```

Penggunaannya bisa dilihat di <a href="https://gist.github.com/frenyaif/0cf65bd9a1caa253876006c37690aa8c/archive/fcef324f747bcc0eddacb67b4d3fd673a750374b.zip" target="_blank">GitHub Gist</a>
