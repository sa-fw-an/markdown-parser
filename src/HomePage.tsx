import React, { useState, useCallback, useRef } from "react";
import MarkdownRenderer from "./components/MarkdownRenderer";
import {
  GitHubIcon,
  UploadIcon,
  DocumentIcon,
  EyeIcon,
  DownloadIcon,
  XMarkIcon,
} from "./components/Icons";

const HomePage: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasFileLoaded, setHasFileLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isContentEdited = markdownContent !== originalContent && hasFileLoaded;

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (
        file &&
        (file.type === "text/markdown" || file?.name.endsWith(".md"))
      ) {
        setIsLoading(true);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setMarkdownContent(content);
          setOriginalContent(content);
          setHasFileLoaded(true);
          setIsLoading(false);
        };
        reader.readAsText(file);
      } else {
        alert("Please select a valid Markdown (.md) file");
      }
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "text/markdown" || file.name.endsWith(".md")) {
        setIsLoading(true);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setMarkdownContent(content);
          setOriginalContent(content);
          setHasFileLoaded(true);
          setIsLoading(false);
        };
        reader.readAsText(file);
      } else {
        alert("Please select a valid Markdown (.md) file");
      }
    }
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const loadSampleContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("./assets/sample.md");
      const content = await response.text();
      setMarkdownContent(content);
      setOriginalContent(content);
      setFileName("sample.md");
      setHasFileLoaded(true);
    } catch (error) {
      console.error("Failed to load sample content:", error);
      alert("Failed to load sample content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearContent = useCallback(() => {
    setMarkdownContent("");
    setOriginalContent("");
    setFileName("");
    setHasFileLoaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const downloadFile = useCallback(() => {
    if (!markdownContent.trim()) {
      alert("No content to download");
      return;
    }

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    let downloadFileName = fileName;
    if (!downloadFileName) {
      downloadFileName = "document.md";
    } else if (isContentEdited && !downloadFileName.includes("_edited")) {
      const nameWithoutExt = downloadFileName.replace(/\.md$/, "");
      downloadFileName = `${nameWithoutExt}_edited.md`;
    }

    link.href = url;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [markdownContent, fileName, isContentEdited]);

  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode((prev) => !prev);
  }, []);

  const FileInfoPanel = () => (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Loaded File</h2>
        <button
          onClick={clearContent}
          className="p-1 rounded-lg bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
          aria-label="Remove file"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
        <div className="flex items-center space-x-3">
          <DocumentIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-blue-200 block truncate">
              {fileName}
            </span>
            {isContentEdited && (
              <span className="text-xs text-yellow-400">• Modified</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-3 mt-4">
        <button
          onClick={downloadFile}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <DownloadIcon className="w-4 h-4" />
          <span>{isContentEdited ? "Download Edited" : "Download"}</span>
        </button>
        <button
          onClick={clearContent}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  const FileUploadPanel = () => (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 flex-shrink-0">
      <h2 className="text-lg font-semibold text-white mb-4">
        Upload Markdown File
      </h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-600 rounded-lg p-6 xl:p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center">
            <UploadIcon className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              Drop your markdown file here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">Supports .md files</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="flex space-x-3 mt-4">
        <button
          onClick={loadSampleContent}
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Load Sample"}
        </button>
        <button
          onClick={() => {
            setMarkdownContent("");
            setOriginalContent("");
            setHasFileLoaded(false);
          }}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Start Fresh
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/90 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <DocumentIcon className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">
                  Markdown Parser
                </h1>
                <p className="text-sm text-gray-400">
                  Beautiful markdown rendering
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {markdownContent && (
                <button
                  onClick={downloadFile}
                  className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                  aria-label="Download file"
                >
                  <DownloadIcon className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={togglePreviewMode}
                className="lg:hidden p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                aria-label="Toggle preview"
              >
                <EyeIcon className="w-5 h-5" />
              </button>

              <a
                href="https://github.com/sa-fw-an"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                aria-label="View on GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {!isPreviewMode ? (
            <div className="space-y-4">
              {hasFileLoaded ? (
                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-white">
                      Loaded File
                    </h2>
                    <button
                      onClick={clearContent}
                      className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                      aria-label="Remove file"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800 mb-3">
                    <div className="flex items-center space-x-2">
                      <DocumentIcon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-200 truncate">
                        {fileName}
                      </span>
                      {isContentEdited && (
                        <span className="text-xs text-yellow-400">
                          • Modified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={downloadFile}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={clearContent}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4">
                  <h2 className="text-lg font-semibold text-white mb-3">
                    Upload File
                  </h2>

                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center">
                        <UploadIcon className="text-blue-400 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Drop file or tap to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Supports .md files
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".md,.markdown"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={loadSampleContent}
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Loading..." : "Sample"}
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">
                    Markdown Editor
                  </h2>
                </div>
                <div className="p-4">
                  <textarea
                    value={markdownContent}
                    onChange={(e) => setMarkdownContent(e.target.value)}
                    placeholder="Type or paste your markdown content here..."
                    className="w-full h-64 resize-none border-0 outline-none bg-transparent text-white placeholder-gray-400 font-mono text-sm leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Live Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div
                className="overflow-auto p-4 sm:p-6"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                {markdownContent ? (
                  <MarkdownRenderer content={markdownContent} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <EyeIcon className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      No content to preview
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Upload a file or start typing to see the preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            <div
              className="flex flex-col space-y-6 h-screen"
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              {hasFileLoaded ? <FileInfoPanel /> : <FileUploadPanel />}

              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex-1 flex flex-col min-h-0">
                <div className="p-4 border-b border-gray-700 flex-shrink-0">
                  <h2 className="text-lg font-semibold text-white">
                    Markdown Editor
                  </h2>
                </div>
                <div className="flex-1 p-4 min-h-0">
                  <textarea
                    value={markdownContent}
                    onChange={(e) => setMarkdownContent(e.target.value)}
                    placeholder="Type or paste your markdown content here..."
                    className="w-full h-full resize-none border-0 outline-none bg-transparent text-white placeholder-gray-400 font-mono text-sm leading-relaxed overflow-auto"
                  />
                </div>
              </div>
            </div>

            <div
              className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col"
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <h2 className="text-lg font-semibold text-white">
                  Live Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-6 min-h-0">
                {markdownContent ? (
                  <MarkdownRenderer content={markdownContent} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <EyeIcon className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      No content to preview
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Upload a markdown file or start typing to see the live
                      preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-8 lg:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300 mb-2">
                Built with ❤️ by{" "}
                <a
                  href="https://www.safwansayeed.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Safwan Sayeed
                </a>
              </p>
              <p className="text-xs text-gray-400">
                Beautiful markdown rendering made simple
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">
                  Want to contribute?
                </p>
                <a
                  href="https://github.com/sa-fw-an/markdown-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400 mb-2">Follow me</p>
                <a
                  href="https://github.com/sa-fw-an"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>@sa-fw-an</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
