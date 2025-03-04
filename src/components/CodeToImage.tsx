"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView, lineNumbers, gutter } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { material } from "@uiw/codemirror-theme-material";
import { githubDark } from "@uiw/codemirror-theme-github";
import { solarizedDark, solarizedLight } from "@uiw/codemirror-theme-solarized";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { materialDark } from "@uiw/codemirror-theme-material";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { sql } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { yaml } from "@codemirror/lang-yaml";

import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeSlashIcon, PhotoIcon, CloudArrowDownIcon } from "@heroicons/react/24/outline";

const languageModules: { [key: string]: any } = {
    JavaScript: javascript,
    Python: python,
    Java: java,
    Cpp: cpp,
    PHP: php,
    HTML: html,
    CSS: css,
    SQL: sql,
    Markdown: markdown,
    JSON: json,
    XML: xml,
    YAML: yaml,
};
  
const themeModules: { [key: string]: any } = {
    oneDark,
    dracula,
    material,
    githubDark,
    solarizedDark,
    solarizedLight,
    tokyoNight,
    materialDark,
};

const themeNames = Object.keys(themeModules);  

const myTheme = EditorView.theme({
    "&": {
        padding: "20px",
        borderRadius: "5px",
    },
    ".cm-content": {
        padding: "20px",  // Inner padding
    }
});

const getBackgroundColorByClass = (className: string) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
        return window.getComputedStyle(element).backgroundColor;
    }
    return null;
};


export default function CodeToImage() {
    const [theme, setTheme] = useState(oneDark);
    const [language, setLanguage] = useState<null | any>(languageModules["JavaScript"]);
    const [code, setCode] = useState("console.log('Hello, world!');");
    const [width, setWidth] = useState("600px");
    const [padding, setPadding] = useState("100px");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [fontSize, setFontSize] = useState("16px");
    const [__filename, set__filename] = useState("hello-world.js");
    const [dotsAlign, setDotsAlign] = useState<"left" | "right">("left");    
    const [brandingName, setBrandingName] = useState("@haxneeraj");
    const [showBranding, setShowBranding] = useState(true);
    const [image, setImage] = useState<string | null>(null);
    const [themeBgColor, setThemeBgColor] = useState("#282c34");

    const [showLineNumbers, setShowLineNumbers] = useState(true);
    
    const codeParentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadLanguage("JavaScript");
    }, []);
    
    // ✅ No need for async dynamic import
    const loadLanguage = (lang: string) => {
        const extensionFn = languageModules[lang];
        if (typeof extensionFn === "function") {
            setLanguage(extensionFn());
        } else {
            console.error("Invalid language module:", extensionFn);
        }
    };
    

    // ✅ Fix Theme Change Function
    const handleThemeChange = (themeName: string) => {
        const selectedTheme = themeModules[themeName];
        if (selectedTheme) {
          setTheme(selectedTheme);
        } else {
          setTheme(oneDark); // Fallback to default theme
        }

        // Wait for the DOM update
        setTimeout(() => {
            const bg_Color = getBackgroundColorByClass("cm-editor");
            if (bg_Color) {
                setThemeBgColor(bg_Color);
            }
        }, 100);
    };

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

    // show/hide line numbers
    useEffect(() => {
       const gutter = document.getElementsByClassName('cm-gutters')[0];       
       if(showLineNumbers){
          if(gutter){
            gutter.classList.remove('hide-line-numbers'); 
          }
       }
       else{
          if(gutter){
            gutter.classList.add('hide-line-numbers'); 
          }
       }
    }, [showLineNumbers]);

    const html2Image = async () => {
        const codeElement = document.getElementById("code-area");
        if (!codeElement) return null;
        try {
            // 🔹 Remove background from active line -> create a style element and after remove that
            const style = document.createElement("style");
            style.innerHTML = `
                .cm-activeLine, .cm-activeLineGutter { background: transparent!important; padding-bottom: 0px!important; }
                .branding-name { margin-top:-15px!important; }
            `;
            document.head.appendChild(style);

            // 🔹 Delay to ensure styles are fully loaded
            await new Promise((resolve) => setTimeout(resolve, 500));

            // 🔹 Capture the image
            const canvas = await html2canvas(codeElement, {
                backgroundColor: null,
                useCORS: true,
                scale: 2,  // High-quality rendering
                allowTaint: true
            });

            // 🔹 Remove temporary styles
            document.head.removeChild(style);
    
            // 🔹 Download Image
            const image = canvas.toDataURL("image/png");
            return image;
        } catch (error) {
            console.error("Error capturing image:", error);
            return null;
        }
    };

    const captureImage = async () => {
        const image = await html2Image();
        if (image) {
            const link = document.createElement("a");
            link.href = image;
            link.download = "code-image.png";
            link.click();
        }
    };
    
    
    

    return (
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-20 w-full">
            {/* Sidebar Options */}
            <div className="w-full md:w-1/3 p-5 pt-10 pb-10 bg-gray-900 rounded-md shadow-lg text-gray-400 text-left">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <label className="text-sm">Theme</label>
                            <select                                    
                                onChange={(e) => handleThemeChange(e.target.value)}
                                className="w-full border border-gray-300 rounded-md bg-gray-700 text-gray-300 py-2 pl-3 pr-10 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Theme</option>
                                {themeNames.map((theme) => (
                                    <option key={theme} value={theme}>
                                    {theme}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm">Language</label>
                            <select
                                value={language}
                                onChange={(e) => loadLanguage(e.target.value)}
                                className="w-full border border-gray-300 rounded-md bg-gray-700 text-gray-300 py-2 pl-3 pr-10 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Language</option>
                                {Object.keys(languageModules).map((lang) => (
                                    <option key={lang} value={lang}>
                                    {lang}
                                    </option>
                                ))}
                            </select>
                        
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <div className="flex-1">            
                            <label className="text-sm">Background Color</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm">Background Gredient</label>
                            <input
                                type="color"                                    
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <div className="flex-2">            
                            <label className="text-sm">Width</label>
                            <div className="relative w-full max-w-full md:max-w-[120px]">
                                <input
                                    type="text"
                                    value={width.replace("px", "")}
                                    onChange={(e) =>{const numericValue = e.target.value.replace(/\D/g, ""); setWidth(numericValue ? numericValue + "px" : "");}}
                                    className="w-full border border-gray-300 rounded-md bg-gray-700 text-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                    px
                                </span>
                            </div>
                        </div>
                        <div className="flex-2">            
                            <label className="text-sm">Padding</label>
                            <div className="relative w-full max-w-full md:max-w-[120px]">
                                <input
                                    type="text"
                                    value={padding.replace("px", "")}
                                    onChange={(e) =>{const numericValue = e.target.value.replace(/\D/g, ""); setPadding(numericValue ? numericValue + "px" : "");}}
                                    className="w-full border border-gray-300 rounded-md bg-gray-700 text-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                    px
                                </span>
                            </div>
                        </div>
                        <div className="flex-1">            
                            <label className="text-sm">Font Size</label>
                            <input
                                type="number"
                                value={parseInt(fontSize)}
                                onChange={(e) => setFontSize(e.target.value + "px")}
                                className="w-full border p-2 rounded bg-gray-700 text-gray-300"
                            />
                        </div>                            
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <div className="flex-1">            
                            <label className="text-sm">File Name</label>
                            <input
                                type="text"
                                value={__filename}
                                onChange={(e) => set__filename(e.target.value)}
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <div className="flex-1">
                            <label className="text-sm">Dots Align</label>
                            <div className="flex items-center">           
                                <button
                                    className={`px-4 py-2 border border-gray-300 flex items-center w-full ${
                                        dotsAlign === "left" ? "bg-gray-700 text-gray-300" : "text-gray-600"
                                    }`}
                                    onClick={() => setDotsAlign("left")}
                                >
                                    <ChevronLeftIcon className="w-6 h-6" />
                                    Left
                                </button>
                                <button
                                    className={`px-4 py-2 border border-gray-300 flex items-center w-full ${
                                        dotsAlign === "right" ? "bg-gray-700 text-gray-300" : "text-gray-600"
                                    }`}
                                    onClick={() => setDotsAlign("right")}
                                >
                                    Right
                                    <ChevronRightIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1">  
                            <label className="text-sm">Line Numbers</label> 
                            <div className="flex items-center">         
                                <button
                                    className={`px-4 py-2 border border-gray-300 flex items-center w-full ${
                                        showLineNumbers === true ? "bg-gray-700 text-gray-300" : "text-gray-600"
                                    }`}
                                    onClick={() => setShowLineNumbers(true)}
                                >
                                    <EyeIcon className="w-6 h-6" />
                                    Show
                                </button>
                                <button
                                    className={`px-4 py-2 border border-gray-300 flex items-center w-full ${
                                        showLineNumbers === false ? "bg-gray-700 text-gray-300" : "text-gray-600"
                                    }`}
                                    onClick={() => setShowLineNumbers(false)}
                                >
                                    Hide
                                    <EyeSlashIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <div className="flex-1">            
                            <label className="text-sm">Branding Name</label>
                            <input
                                type="text"
                                value={brandingName}
                                onChange={(e) => setBrandingName(e.target.value)}
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm">Font Color</label>
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-700 text-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">                         
                        <div className="flex-1">  
                            <label className="text-sm">Branding</label> 
                            <div className="flex items-center">         
                                <button
                                    className={`px-4 py-2 border border-gray-300 flex items-center w-full ${
                                        showBranding === true ? "bg-gray-700 text-gray-300" : "text-gray-600"
                                    }`}
                                    onClick={() => setShowBranding(true)}
                                >
                                    <EyeIcon className="w-6 h-6" />
                                    Show
                                </button>
                                <button
                                    className={`px-4 py-2 border border-gray-300 flex items-center w-full ${
                                        showBranding === false ? "bg-gray-700 text-gray-300" : "text-gray-600"
                                    }`}
                                    onClick={() => setShowBranding(false)}
                                >
                                    Hide
                                    <EyeSlashIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1">  
                            <label className="text-sm">Select Logo</label> 
                            <button 
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 w-full"
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
            <div className="flex flex-col items-center w-full md:w-2/3">
                <div className="flex flex-col items-center w-full px-4 md:px-0 relative overflow-x-scroll md:overflow-hidden">
                    <div
                        id="code-area"
                        className="p-5 sm:p-10 shadow-lg flex justify-center items-center relative w-full"
                        ref={codeParentRef}
                        style={{
                            backgroundColor: bgColor,
                            minWidth: "720px",
                            width: width,
                            maxWidth: "920px",
                            padding: padding,
                            margin: 0,
                            border: "none",
                        }}
                    >
                        <div
                            className="p-3 rounded-lg relative w-auto h-auto text-left"
                            style={{ backgroundColor: themeBgColor }}
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
                            <CodeMirror
                                value={code}
                                height="auto"
                                width="auto"
                                theme={theme}
                                extensions={[
                                    myTheme,
                                    language ? [language] : [],                                    
                                    EditorView.lineWrapping,
                                    showLineNumbers ? [    
                                        lineNumbers(),
                                        gutter({class: "cm-mygutter"}),
                                    ] : [],
                                ]}
                                onChange={(value) => setCode(value)}
                                style={{
                                    minHeight: "100px",
                                    lineHeight: "1.5",
                                }}
                            />
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
                                        className="text-sm branding-name"
                                        style={{ color: textColor }}
                                    >
                                        {brandingName}
                                    </span>
                                </div>
                            </div>
                        )}
                        
                    </div>         
                </div>
                {/* Download Button */}
                <div className="flex justify-center mt-4">
                    <button className="mt-4 px-4 py-2 bg-gray-700 text-gray-300 rounded flex justify-center gap-1" onClick={captureImage}>
                        <CloudArrowDownIcon className="w-6 h-6"/> Download Image
                    </button>
                </div>
            </div>
        </div>
      );
}
