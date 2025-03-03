"use client";

import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark"; 
import * as themes from "@uiw/codemirror-themes";

console.log("THEMES:", themes);


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

import { dracula } from "@uiw/codemirror-theme-dracula";
import { material } from "@uiw/codemirror-theme-material";
import { githubDark } from "@uiw/codemirror-theme-github";
import { solarizedDark, solarizedLight } from "@uiw/codemirror-theme-solarized";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { materialDark } from "@uiw/codemirror-theme-material";

// ✅ Theme names
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
export default function CodeEditor() {
  const [theme, setTheme] = useState(oneDark);
  const [language, setLanguage] = useState<null | any>(null);
  const [code, setCode] = useState("// Select a language to start coding...");

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
      console.error("Invalid Theme:", themeName);
      setTheme(oneDark); // Fallback to default theme
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      {/* Selectors */}
      <div className="flex gap-4 mb-4">
        {/* Language Selector */}
        <select
          className="p-2 bg-gray-700 text-white rounded"
          onChange={(e) => loadLanguage(e.target.value)}
        >
          {Object.keys(languageModules).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        {/* Theme Selector */}
        <select
          className="p-2 bg-gray-700 text-white rounded"
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          {themeNames.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      {/* CodeMirror Editor */}
      <CodeMirror
        value={code}
        height="500px"
        theme={theme}
        extensions={language ? [language] : []}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}
