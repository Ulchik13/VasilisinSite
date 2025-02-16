import fs from 'fs'; // Добавляем импорт модуля fs
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
  await imagemin(['images/*.{jpg,png}'], {
    destination: 'output/images',
    plugins: [
      imageminWebp({quality: 75})
    ]
  });

  console.log('Images converted to WebP');

  // Удаляем оригинальные файлы
  fs.readdir('images', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.endsWith('.jpg') || file.endsWith('.png')) {
        fs.unlink(`images/${file}`, (err) => {
          if (err) throw err;
          console.log(`${file} was deleted`);
        });
      }
    });
  });
})();
