# 🚀 Markdown Parser

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://safwansayeed.github.io/md-parser/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/safwansayeed/md-parser)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A beautiful, feature-rich markdown parser built with React, TypeScript, and Tailwind CSS. Perfect for rendering GitHub Flavored Markdown with additional features like math expressions, YouTube embeds, and custom alerts.

![Markdown Parser Screenshot](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&crop=center)

## ✨ Features

### 🎨 **Beautiful Design**
- Modern, clean interface with gradient backgrounds
- Dark/Light mode with automatic system detection
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Custom icons and visual elements

### � **Comprehensive Markdown Support**
- **GitHub Flavored Markdown** - Full GFM compatibility
- **Tables** - Beautiful, responsive table rendering
- **Task Lists** - Interactive checkboxes
- **Syntax Highlighting** - Code blocks with copy functionality
- **Autolink Headers** - Automatic anchor links for headings
- **Strikethrough** - ~~Text formatting~~
- **Footnotes** - Reference-style footnotes

### 🚀 **Advanced Features**
- ✅ **Math Expressions** - Inline ($E=mc^2$) and block math rendering
- ✅ **Emoji Support** - Convert :emoji: codes to actual emojis 😊
- ✅ **YouTube Embeds** - Direct video embedding with `[youtube: VIDEO_ID]`
- ✅ **Custom Alerts** - Note, tip, warning, important, and caution boxes
- ✅ **Collapsible Sections** - Expandable content areas
- ✅ **Keyboard Shortcuts** - Styled with `[[Ctrl+C]]` syntax
- ✅ **Text Highlighting** - ==Highlighted text== support
- ✅ **Image Zoom** - Click to zoom functionality for images
- ✅ **Copy Code** - One-click code copying with visual feedback

### 📁 **File Handling**
- **Drag & Drop** - Simply drag markdown files into the upload area
- **File Browser** - Click to browse and select files
- **Real-time Preview** - See changes as you type
- **Sample Content** - Built-in demo content to explore features
- **Clear Function** - Quick reset functionality

### ⚙️ **Developer Experience**
- **TypeScript** - Full type safety and IntelliSense
- **Modern React** - Hooks-based architecture with React 19
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning-fast development and building
- **ESLint** - Code quality and consistency
- **GitHub Actions** - Automated deployment to GitHub Pages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/safwansayeed/md-parser.git
cd md-parser
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:5173/md-parser/`

## 🛠️ Build and Deploy

### Local Build
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

The project includes GitHub Actions workflow for automatic deployment when you push to the main branch.

## 📖 Usage Guide

### 🎯 Getting Started
1. **Upload a File**: Drag and drop a `.md` file or click to browse
2. **Type Content**: Use the text editor to write markdown
3. **Live Preview**: See real-time rendering on the right panel
4. **Toggle Theme**: Switch between light and dark modes
5. **Sample Content**: Click "Load Sample" to see all features

### 📝 Supported Markdown Syntax

#### Basic Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
==Highlighted text==
`Inline code`
```

#### Lists
```markdown
- Unordered list
- [x] Task list (completed)
- [ ] Task list (incomplete)

1. Ordered list
2. Another item
```

#### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](image-url.jpg "Optional title")
```

#### Code Blocks
````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

#### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Info     | Data     |
```

#### Math Expressions
```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

#### Custom Features

**Emoji Shortcodes:**
```markdown
:rocket: :heart: :star: :fire: :tada:
```

**YouTube Embeds:**
```markdown
[youtube: dQw4w9WgXcQ]
```

**Custom Alerts:**
```markdown
:::note
This is a note alert
:::

:::tip
This is a tip alert
:::

:::warning
This is a warning alert
:::

:::important
This is an important alert
:::

:::caution
This is a caution alert
:::
```

**Collapsible Sections:**
```markdown
:::details Click to expand
Hidden content goes here
:::
```

**Keyboard Shortcuts:**
```markdown
Press [[Ctrl+C]] to copy
```

## 🔧 Configuration

### Customizing the Parser

The markdown renderer can be customized by modifying the `MarkdownRenderer` component. Key configuration options include:

```typescript
// Emoji mapping
const EMOJI_MAP = {
  ':smile:': '�',
  ':heart:': '❤️',
  // Add more emojis
};

// Alert types
const ALERT_TYPES = {
  note: { icon: 'ℹ️', bg: 'bg-blue-50', /* ... */ },
  // Add custom alert types
};
```

### GitHub Pages Setup

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Update base path** in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repository-name/',
  // ... other config
})
```
4. **Push changes** - GitHub Actions will handle deployment

### Environment Variables

Create a `.env` file for local development:
```env
VITE_APP_TITLE=My Markdown Parser
VITE_GITHUB_REPO=https://github.com/username/repo
```

## 🎨 Customization

### Theming

The application uses Tailwind CSS for styling. You can customize:

- **Colors**: Modify the color palette in Tailwind config
- **Fonts**: Update font families and sizes
- **Spacing**: Adjust margins and padding
- **Animations**: Customize transitions and effects

### Adding New Features

1. **Custom Markdown Plugins**: Add new remark/rehype plugins
2. **File Format Support**: Extend to support other formats
3. **Export Options**: Add PDF, HTML export functionality
4. **Collaborative Editing**: Real-time collaboration features

## 📦 Dependencies

### Core Libraries
- **react** (^19.1.0) - UI library
- **react-dom** (^19.1.0) - DOM rendering
- **react-router-dom** (^6.x) - Client-side routing
- **tailwindcss** (^4.1.10) - CSS framework

### Markdown Processing
- **react-markdown** (^10.1.0) - Markdown parsing and rendering
- **remark-gfm** (^4.0.1) - GitHub Flavored Markdown
- **remark-supersub** (^1.0.0) - Superscript and subscript
- **remark-frontmatter** (^5.0.0) - YAML frontmatter support
- **rehype-raw** (^7.0.0) - Raw HTML support
- **rehype-slug** (^6.0.0) - Header anchor generation
- **rehype-autolink-headings** (^7.1.0) - Automatic header links
- **rehype-sanitize** (^6.0.0) - HTML sanitization

### Development Tools
- **typescript** (~5.8.3) - Type checking
- **vite** (^6.3.5) - Build tool and dev server
- **eslint** (^9.25.0) - Code linting
- **@vitejs/plugin-react** (^4.4.1) - React integration for Vite

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use the GitHub issue tracker
- Include steps to reproduce
- Provide browser and OS information
- Add screenshots if applicable

### 💡 Feature Requests
- Check existing issues first
- Describe the use case
- Explain the expected behavior
- Consider implementation complexity

### 🔨 Development

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** if applicable
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### 📋 Development Guidelines

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Libraries and Tools
- **[React](https://reactjs.org/)** - The amazing UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Heroicons](https://heroicons.com/)** - Beautiful SVG icons

### Inspiration
- **GitHub** - For GitHub Flavored Markdown specification
- **Notion** - For beautiful markdown editing experience
- **Typora** - For elegant markdown preview
- **MDX** - For component-based markdown

## � Roadmap

### Upcoming Features
- [ ] **PDF Export** - Generate PDF from markdown
- [ ] **Multiple Files** - Support for multiple file editing
- [ ] **Plugin System** - Extensible architecture
- [ ] **Collaborative Editing** - Real-time collaboration
- [ ] **Custom Themes** - User-defined color schemes
- [ ] **Markdown Extensions** - Custom syntax support
- [ ] **Mobile App** - Native mobile applications
- [ ] **API Integration** - Connect with external services

### Performance Improvements
- [ ] **Code Splitting** - Reduce initial bundle size
- [ ] **Virtual Scrolling** - Handle large documents
- [ ] **Service Worker** - Offline functionality
- [ ] **WebAssembly** - Faster markdown processing

## 📊 Project Stats

- **Bundle Size**: ~666KB (minified, ~208KB gzipped)
- **Performance**: 95+ Lighthouse score
- **Accessibility**: WCAG 2.1 AA compliant
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Support**: Fully responsive design

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

[🌟 Star this repo](https://github.com/safwansayeed/md-parser) | [🐛 Report Bug](https://github.com/safwansayeed/md-parser/issues) | [💡 Request Feature](https://github.com/safwansayeed/md-parser/issues)

</div>
