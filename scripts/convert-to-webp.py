"""
Скрипт для конвертации PNG изображений в WebP формат
Требует установки Pillow: pip install Pillow
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Устанавливаем кодировку для Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

def convert_png_to_webp(input_path, output_path, quality=85):
    """
    Конвертирует PNG изображение в WebP формат
    
    Args:
        input_path: Путь к исходному PNG файлу
        output_path: Путь для сохранения WebP файла
        quality: Качество WebP (0-100), по умолчанию 85
    """
    try:
        img = Image.open(input_path)
        
        # Конвертируем в RGB, если изображение RGBA (для прозрачности используем lossless=False)
        if img.mode == 'RGBA':
            img.save(output_path, 'WebP', quality=quality, method=6)
        else:
            img = img.convert('RGB')
            img.save(output_path, 'WebP', quality=quality, method=6)
        
        print(f"✓ Конвертировано: {input_path.name} -> {output_path.name}")
        return True
    except Exception as e:
        print(f"✗ Ошибка при конвертации {input_path.name}: {e}")
        return False

def main():
    # Путь к папке с изображениями
    img_dir = Path('assets/img')
    
    if not img_dir.exists():
        print(f"Ошибка: папка {img_dir} не найдена")
        return
    
    # Список PNG файлов для конвертации
    png_files = [
        'hero-background.png',
        'property-1.png',
        'property-2.png',
        'property-3.png',
        'property-4.png',
        'property-5.png',
        'property-6.png',
        'property-featured-bg.png',
        'partner-4.png',
        'partner-5.png',
        'partner-6.png',
        'partner-7.png',
        'partner-8.png',
        'review-avatar-1.png',
        'review-avatar-2.png'
    ]
    
    converted = 0
    failed = 0
    
    print("Начало конвертации PNG -> WebP...")
    print("-" * 50)
    
    for png_file in png_files:
        input_path = img_dir / png_file
        
        if not input_path.exists():
            print(f"⚠ Пропущено (файл не найден): {png_file}")
            continue
        
        webp_file = png_file.replace('.png', '.webp')
        output_path = img_dir / webp_file
        
        if convert_png_to_webp(input_path, output_path):
            converted += 1
        else:
            failed += 1
    
    print("-" * 50)
    print(f"Готово! Конвертировано: {converted}, Ошибок: {failed}")

if __name__ == '__main__':
    main()
