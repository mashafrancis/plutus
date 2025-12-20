# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** Geist Sans — Use for all headings and titles
- **Body text:** Geist Sans — Use for all body text and UI labels
- **Code/technical:** Geist Mono — Use for numbers, code, technical content, and monospace needs

## CSS Classes

Apply fonts using Tailwind utilities or CSS:

```css
.font-geist-sans {
  font-family: 'Geist Sans', sans-serif;
}

.font-geist-mono {
  font-family: 'Geist Mono', monospace;
}
```

## Font Weights

- **Regular (400):** Body text, labels
- **Medium (500):** Emphasized text, secondary headings
- **Semibold (600):** Section headings, important labels
- **Bold (700):** Main headings, strong emphasis

