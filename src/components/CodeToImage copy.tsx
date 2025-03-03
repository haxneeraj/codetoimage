"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeSlashIcon, PhotoIcon } from "@heroicons/react/24/outline";

const languages = [
    { value: "apl", label: "APL" },
    { value: "asn.1", label: "ASN.1" },
    { value: "asterisk", label: "Asterisk" },
    { value: "brainfuck", label: "Brainfuck" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "ceylon", label: "Ceylon" },
    { value: "clojure", label: "Clojure" },
    { value: "cobol", label: "Cobol" },
    { value: "coffeescript", label: "CoffeeScript" },
    { value: "crystal", label: "Crystal" },
    { value: "css", label: "CSS" },
    { value: "dart", label: "Dart" },
    { value: "dockerfile", label: "Docker" },
    { value: "elixir", label: "Elixir" },
    { value: "elm", label: "Elm" },
    { value: "erlang", label: "Erlang" },
    { value: "go", label: "Go" },
    { value: "groovy", label: "Groovy" },
    { value: "haskell", label: "Haskell" },
    { value: "html", label: "HTML" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "json", label: "JSON" },
    { value: "julia", label: "Julia" },
    { value: "kotlin", label: "Kotlin" },
    { value: "latex", label: "LaTeX" },
    { value: "lua", label: "Lua" },
    { value: "markdown", label: "Markdown" },
    { value: "matlab", label: "MATLAB" },
    { value: "nginx", label: "NGINX" },
    { value: "objectivec", label: "Objective-C" },
    { value: "perl", label: "Perl" },
    { value: "php", label: "PHP" },
    { value: "powershell", label: "PowerShell" },
    { value: "python", label: "Python" },
    { value: "r", label: "R" },
    { value: "ruby", label: "Ruby" },
    { value: "rust", label: "Rust" },
    { value: "scala", label: "Scala" },
    { value: "shell", label: "Shell" },
    { value: "sql", label: "SQL" },
    { value: "swift", label: "Swift" },
    { value: "typescript", label: "TypeScript" },
    { value: "vbnet", label: "VB.NET" },
    { value: "vue", label: "Vue.js" },
    { value: "xml", label: "XML" },
    { value: "yaml", label: "YAML" }
];
  
const themes = {
    "default": "default.css",
    "1c-light": "1c-light.css",
    "a11y-dark": "a11y-dark.css",
    "a11y-light": "a11y-light.css",
    "agate": "agate.css",
    "an-old-hope": "an-old-hope.css",
    "androidstudio": "androidstudio.css",
    "arduino-light": "arduino-light.css",
    "arta": "arta.css",
    "ascetic": "ascetic.css",
    "atom-one-dark-reasonable": "atom-one-dark-reasonable.css",
    "atom-one-dark": "atom-one-dark.css",
    "atom-one-light": "atom-one-light.css",
    "brown-paper": "brown-paper.css",
    "codepen-embed": "codepen-embed.css",
    "color-brewer": "color-brewer.css",
    "cybertopia-cherry": "cybertopia-cherry.css",
    "cybertopia-dimmer": "cybertopia-dimmer.css",
    "cybertopia-icecap": "cybertopia-icecap.css",
    "cybertopia-saturated": "cybertopia-saturated.css",
    "dark": "dark.css",
    "devibeans": "devibeans.css",
    "docco": "docco.css",
    "far": "far.css",
    "felipec": "felipec.css",
    "foundation": "foundation.css",
    "github-dark-dimmed": "github-dark-dimmed.css",
    "github-dark": "github-dark.css",
    "github": "github.css",
    "gml": "gml.css",
    "googlecode": "googlecode.css",
    "gradient-dark": "gradient-dark.css",
    "gradient-light": "gradient-light.css",
    "grayscale": "grayscale.css",
    "hybrid": "hybrid.css",
    "idea": "idea.css",
    "intellij-light": "intellij-light.css",
    "ir-black": "ir-black.css",
    "isbl-editor-dark": "isbl-editor-dark.css",
    "isbl-editor-light": "isbl-editor-light.css",
    "kimbie-dark": "kimbie-dark.css",
    "kimbie-light": "kimbie-light.css",
    "lightfair": "lightfair.css",
    "lioshi": "lioshi.css",
    "magula": "magula.css",
    "mono-blue": "mono-blue.css",
    "monokai-sublime": "monokai-sublime.css",
    "monokai": "monokai.css",
    "night-owl": "night-owl.css",
    "nnfx-dark": "nnfx-dark.css",
    "nnfx-light": "nnfx-light.css",
    "nord": "nord.css",
    "obsidian": "obsidian.css",
    "panda-syntax-dark": "panda-syntax-dark.css",
    "panda-syntax-light": "panda-syntax-light.css",
    "paraiso-dark": "paraiso-dark.css",
    "paraiso-light": "paraiso-light.css",
    "pojoaque": "pojoaque.css",
    "purebasic": "purebasic.css",
    "qtcreator-dark": "qtcreator-dark.css",
    "qtcreator-light": "qtcreator-light.css",
    "rainbow": "rainbow.css",
    "rose-pine-dawn": "rose-pine-dawn.css",
    "rose-pine-moon": "rose-pine-moon.css",
    "rose-pine": "rose-pine.css",
    "routeros": "routeros.css",
    "school-book": "school-book.css",
    "shades-of-purple": "shades-of-purple.css",
    "srcery": "srcery.css",
    "stackoverflow-dark": "stackoverflow-dark.css",
    "stackoverflow-light": "stackoverflow-light.css",
    "sunburst": "sunburst.css",
    "tokyo-night-dark": "tokyo-night-dark.css",
    "tokyo-night-light": "tokyo-night-light.css",
    "tomorrow-night-blue": "tomorrow-night-blue.css",
    "tomorrow-night-bright": "tomorrow-night-bright.css",
    "vs": "vs.css",
    "vs2015": "vs2015.css",
    "xcode": "xcode.css",
    "xt256": "xt256.css"
};
  

  

export default function CodeToImage() {
    const [code, setCode] = useState("console.log('Hello, world!');");
    const [theme, setTheme] = useState<keyof typeof themes>("default");
    const [language, setLanguage] = useState<string>("javascript");
    const [width, setWidth] = useState("600px");
    const [padding, setPadding] = useState("100px");
    const [bgColor, setBgColor] = useState("#1e1e1e");
    const [textColor, setTextColor] = useState("#ffffff");
    const [fontSize, setFontSize] = useState("16px");
    const [__filename, set__filename] = useState("hello-world.js");
    const [dotsAlign, setDotsAlign] = useState<"left" | "right">("left");    
    const [brandingName, setBrandingName] = useState("@haxneeraj");
    const [showBranding, setShowBranding] = useState(true);
    const [image, setImage] = useState<string | null>(null);

    const [showLineNumbers, setShowLineNumbers] = useState(true);
    
    const codeParentRef = useRef<HTMLDivElement>(null);
    const codeRef = useRef<HTMLElement>(null);

    // Highlighted Code
    const lang = Prism.languages[language] || Prism.languages.javascript;
    const highlightedCode = Prism.highlight(code, lang, language || "javascript");

    // Split code into lines
    const lines = code.split("\n");

    // Apply syntax highlighting when code or language changes
    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);
    

    // Update theme
    useEffect(() => {
        const themeCSS = document.getElementById("highlight-theme");
        if (themeCSS) {
        themeCSS.setAttribute("href", `/highlight.js/styles/${themes[theme]}.css`);
        }
    }, [theme]);

    // Update Width
    useEffect(() => {
        if (codeParentRef.current) {
            codeParentRef.current.style.width = width;
        }
    }, [width]);

    // Update padding
    useEffect(() => {
        if (codeParentRef.current) {
            codeParentRef.current.style.padding = padding;
        }
    }, [padding]);  
    
    // Handle Image Selection
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string); // Convert image to base64 URL
        };
        reader.readAsDataURL(file);
        }
    };
  
  

    const captureImage = async () => {
        const codeElement = document.getElementById("code-area");
        if (codeElement) {
            const canvas = await html2canvas(codeElement);
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = "code-image.png";
            link.click();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-20">
            {/* Title */}
            <div className="w-full text-center mb-20">
                <h1 className="text-4xl font-bold">Code to Image</h1>
            </div>
            <div className="flex gap-6">
                {/* Sidebar Options */}
                <div className="w-1/3 p-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-sm font-semibold">Theme</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value as keyof typeof themes)}
                                    className="w-full border border-gray-300 rounded-md bg-white text-gray-700 py-2 pl-3 pr-10 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {Object.entries(themes).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-semibold">Language</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md bg-white text-gray-700 py-2 pl-3 pr-10 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                                    ))}
                                </select>
                            
                            </div>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div className="flex-1">            
                                <label className="text-sm font-semibold">Background Color</label>
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-semibold">Background Gredient</label>
                                <input
                                    type="color"                                    
                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <div className="flex-2">            
                                <label className="text-sm font-semibold">Width</label>
                                <div className="relative w-full max-w-[120px]">
                                    <input
                                        type="text"
                                        value={width.replace("px", "")}
                                        onChange={(e) =>{const numericValue = e.target.value.replace(/\D/g, ""); setWidth(numericValue ? numericValue + "px" : "");}}
                                        className="w-full border border-gray-300 rounded-md bg-white text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        px
                                    </span>
                                </div>
                            </div>
                            <div className="flex-2">            
                                <label className="text-sm font-semibold">Padding</label>
                                <div className="relative w-full max-w-[120px]">
                                    <input
                                        type="text"
                                        value={padding.replace("px", "")}
                                        onChange={(e) =>{const numericValue = e.target.value.replace(/\D/g, ""); setPadding(numericValue ? numericValue + "px" : "");}}
                                        className="w-full border border-gray-300 rounded-md bg-white text-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                        px
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">            
                                <label className="text-sm font-semibold">Font Size</label>
                                <input
                                    type="number"
                                    value={parseInt(fontSize)}
                                    onChange={(e) => setFontSize(e.target.value + "px")}
                                    className="w-full border p-2 rounded"
                                />
                            </div>                            
                        </div>

                        <div className="flex gap-3 mt-3">
                            <div className="flex-1">            
                                <label className="text-sm font-semibold">File Name</label>
                                <input
                                    type="text"
                                    value={__filename}
                                    onChange={(e) => set__filename(e.target.value)}
                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <div className="flex-1">
                                <label className="text-sm font-semibold">Dots Align</label>
                                <div className="flex items-center">           
                                    <button
                                        className={`px-4 py-2 border border-gray-300 flex items-center ${
                                            dotsAlign === "left" ? "bg-blue-500 text-white" : "text-gray-600"
                                        }`}
                                        onClick={() => setDotsAlign("left")}
                                    >
                                        <ChevronLeftIcon className="w-6 h-6" />
                                        Left
                                    </button>
                                    <button
                                        className={`px-4 py-2 border border-gray-300 flex items-center ${
                                            dotsAlign === "right" ? "bg-blue-500 text-white" : "text-gray-600"
                                        }`}
                                        onClick={() => setDotsAlign("right")}
                                    >
                                        Right
                                        <ChevronRightIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1">  
                                <label className="text-sm font-semibold">Line Numbers</label> 
                                <div className="flex items-center">         
                                    <button
                                        className={`px-4 py-2 border border-gray-300 flex items-center ${
                                            showLineNumbers === true ? "bg-blue-500 text-white" : "text-gray-600"
                                        }`}
                                        onClick={() => setShowLineNumbers(true)}
                                    >
                                        <EyeIcon className="w-6 h-6" />
                                        Show
                                    </button>
                                    <button
                                        className={`px-4 py-2 border border-gray-300 flex items-center ${
                                            showLineNumbers === false ? "bg-blue-500 text-white" : "text-gray-600"
                                        }`}
                                        onClick={() => setShowLineNumbers(false)}
                                    >
                                        Hide
                                        <EyeSlashIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div className="flex-1">            
                                <label className="text-sm font-semibold">Branding Name</label>
                                <input
                                    type="text"
                                    value={brandingName}
                                    onChange={(e) => setBrandingName(e.target.value)}
                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-semibold">Font Color</label>
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-3">                            
                            <div className="flex-1">  
                                <label className="text-sm font-semibold">Branding</label> 
                                <div className="flex items-center">         
                                    <button
                                        className={`px-4 py-2 border border-gray-300 flex items-center ${
                                            showBranding === true ? "bg-blue-500 text-white" : "text-gray-600"
                                        }`}
                                        onClick={() => setShowBranding(true)}
                                    >
                                        <EyeIcon className="w-6 h-6" />
                                        Show
                                    </button>
                                    <button
                                        className={`px-4 py-2 border border-gray-300 flex items-center ${
                                            showBranding === false ? "bg-blue-500 text-white" : "text-gray-600"
                                        }`}
                                        onClick={() => setShowBranding(false)}
                                    >
                                        Hide
                                        <EyeSlashIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1">  
                                <label className="text-sm font-semibold">Select Logo</label> 
                                <button 
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
                                onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    <PhotoIcon className="w-5 h-5" />
                                    Select image
                                </button>
                                {/* Hidden File Input */}
                                <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="fileInput"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* Code Preview */}
                <div className="flex flex-col items-center w-2/3">
                    <div
                        id="code-area"
                        className="p-10 shadow-lg flex justify-center items-center relative"
                        ref={codeParentRef}
                        style={{ backgroundColor: bgColor, width: width, padding: padding }} 
                    >
                        <div
                        className="p-3 rounded-lg relative bg-white w-full h-full"
                        >
                            <div className={`flex ${dotsAlign === "left" ? "justify-between" : "flex-row-reverse justify-between"} items-center mb-2`}>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="text-sm text-gray-400">{__filename}</span>
                            </div>                            
                        
                            {/* Code Block with Line Numbers */}
                            <div className="relative flex text-gray-600 overflow-auto w-full bg-white" style={{ fontSize:fontSize }} >
                                <div className="w-full grid grid-cols-[auto_1fr]">
                                    {/* Line Numbers (if enabled) */}
                                    {showLineNumbers && (
                                        <div className="bg-gray-200 text-gray-500 text-sm px-3 py-4 text-right select-none">
                                        {lines.map((_, i) => (
                                            <div key={i} className="leading-relaxed">{i + 1}</div>
                                        ))}
                                        </div>
                                    )}

                                    {/* Code Content */}
                                    <pre className="p-4 w-full whitespace-pre-wrap break-words overflow-auto">
                                    <code ref={codeRef} className={`language-${language}`}>
                                        {code}
                                    </code>
                                    </pre>
                                </div>
                            </div>


                        </div>
                        {/* Branding */}
                        {showBranding && (
                            <div className="absolute bottom-10 right-auto text-sm" style={{ color: textColor }}>
                                <div className="flex items-center gap-2">
                                    {/* Avatar */}
                                    <img
                                        src={image || "https://avatars.githubusercontent.com/u/4723117?v=4"}
                                        className="w-8 h-8 rounded-full"
                                        alt="Avatar"
                                    />
                                    
                                    {/* Branding Name */}
                                    <span
                                        className="text-sm"
                                        style={{ color: textColor }}
                                    >
                                        {brandingName}
                                    </span>
                                </div>
                            </div>
                        )}
                        
                    </div>
                    <textarea
                    className="w-full mt-4 p-2 border rounded"
                    rows={5}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    ></textarea>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={captureImage}>Download Image</button>
                </div>
            </div>
        </div>
      );
}
