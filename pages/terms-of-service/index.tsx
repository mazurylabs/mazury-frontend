import * as React from 'react';
import { Helmet } from 'react-helmet';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service</title>
        <style>
          {`html {
        -webkit-print-color-adjust: exact;
      }
      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }
      @media only screen {
        body {
          margin: 2em auto;
          max-width: 900px;
          color: rgb(55, 53, 47);
        }
      }

      body {
        line-height: 1.5;
        white-space: pre-wrap;
      }

      a,
      a.visited {
        color: inherit;
        text-decoration: underline;
      }

      .pdf-relative-link-path {
        font-size: 80%;
        color: #444;
      }

      h1,
      h2,
      h3 {
        letter-spacing: -0.01em;
        line-height: 1.2;
        font-weight: 600;
        margin-bottom: 0;
      }

      .page-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 0.75em;
      }

      h1 {
        font-size: 1.875rem;
        margin-top: 1.875rem;
      }

      h2 {
        font-size: 1.5rem;
        margin-top: 1.5rem;
      }

      h3 {
        font-size: 1.25rem;
        margin-top: 1.25rem;
      }

      .source {
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 1.5em;
        word-break: break-all;
      }

      .callout {
        border-radius: 3px;
        padding: 1rem;
      }

      figure {
        margin: 1.25em 0;
        page-break-inside: avoid;
      }

      figcaption {
        opacity: 0.5;
        font-size: 85%;
        margin-top: 0.5em;
      }

      mark {
        background-color: transparent;
      }

      .indented {
        padding-left: 1.5em;
      }

      hr {
        background: transparent;
        display: block;
        width: 100%;
        height: 1px;
        visibility: visible;
        border: none;
        border-bottom: 1px solid rgba(55, 53, 47, 0.09);
      }

      img {
        max-width: 100%;
      }

      @media only print {
        img {
          max-height: 100vh;
          object-fit: contain;
        }
      }

      @page {
        margin: 1in;
      }

      .collection-content {
        font-size: 0.875rem;
      }

      .column-list {
        display: flex;
        justify-content: space-between;
      }

      .column {
        padding: 0 1em;
      }

      .column:first-child {
        padding-left: 0;
      }

      .column:last-child {
        padding-right: 0;
      }

      .table_of_contents-item {
        display: block;
        font-size: 0.875rem;
        line-height: 1.3;
        padding: 0.125rem;
      }

      .table_of_contents-indent-1 {
        margin-left: 1.5rem;
      }

      .table_of_contents-indent-2 {
        margin-left: 3rem;
      }

      .table_of_contents-indent-3 {
        margin-left: 4.5rem;
      }

      .table_of_contents-link {
        text-decoration: none;
        opacity: 0.7;
        border-bottom: 1px solid rgba(55, 53, 47, 0.18);
      }

      table,
      th,
      td {
        border: 1px solid rgba(55, 53, 47, 0.09);
        border-collapse: collapse;
      }

      table {
        border-left: none;
        border-right: none;
      }

      th,
      td {
        font-weight: normal;
        padding: 0.25em 0.5em;
        line-height: 1.5;
        min-height: 1.5em;
        text-align: left;
      }

      th {
        color: rgba(55, 53, 47, 0.6);
      }

      ol,
      ul {
        margin: 0;
        margin-block-start: 0.6em;
        margin-block-end: 0.6em;
      }

      li > ol:first-child,
      li > ul:first-child {
        margin-block-start: 0.6em;
      }

      ul > li {
        list-style: disc;
      }

      ul.to-do-list {
        text-indent: -1.7em;
      }

      ul.to-do-list > li {
        list-style: none;
      }

      .to-do-children-checked {
        text-decoration: line-through;
        opacity: 0.375;
      }

      ul.toggle > li {
        list-style: none;
      }

      ul {
        padding-inline-start: 1.7em;
      }

      ul > li {
        padding-left: 0.1em;
      }

      ol {
        padding-inline-start: 1.6em;
      }

      ol > li {
        padding-left: 0.2em;
      }

      .mono ol {
        padding-inline-start: 2em;
      }

      .mono ol > li {
        text-indent: -0.4em;
      }

      .toggle {
        padding-inline-start: 0em;
        list-style-type: none;
      }

      /* Indent toggle children */
      .toggle > li > details {
        padding-left: 1.7em;
      }

      .toggle > li > details > summary {
        margin-left: -1.1em;
      }

      .selected-value {
        display: inline-block;
        padding: 0 0.5em;
        background: rgba(206, 205, 202, 0.5);
        border-radius: 3px;
        margin-right: 0.5em;
        margin-top: 0.3em;
        margin-bottom: 0.3em;
        white-space: nowrap;
      }

      .collection-title {
        display: inline-block;
        margin-right: 1em;
      }

      .simple-table {
        margin-top: 1em;
        font-size: 0.875rem;
        empty-cells: show;
      }
      .simple-table td {
        height: 29px;
        min-width: 120px;
      }

      .simple-table th {
        height: 29px;
        min-width: 120px;
      }

      .simple-table-header-color {
        background: rgb(247, 246, 243);
        color: black;
      }
      .simple-table-header {
        font-weight: 500;
      }

      time {
        opacity: 0.5;
      }

      .icon {
        display: inline-block;
        max-width: 1.2em;
        max-height: 1.2em;
        text-decoration: none;
        vertical-align: text-bottom;
        margin-right: 0.5em;
      }

      img.icon {
        border-radius: 3px;
      }

      .user-icon {
        width: 1.5em;
        height: 1.5em;
        border-radius: 100%;
        margin-right: 0.5rem;
      }

      .user-icon-inner {
        font-size: 0.8em;
      }

      .text-icon {
        border: 1px solid #000;
        text-align: center;
      }

      .page-cover-image {
        display: block;
        object-fit: cover;
        width: 100%;
        max-height: 30vh;
      }

      .page-header-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .page-header-icon-with-cover {
        margin-top: -0.72em;
        margin-left: 0.07em;
      }

      .page-header-icon img {
        border-radius: 3px;
      }

      .link-to-page {
        margin: 1em 0;
        padding: 0;
        border: none;
        font-weight: 500;
      }

      p > .user {
        opacity: 0.5;
      }

      td > .user,
      td > time {
        white-space: nowrap;
      }

      input[type="checkbox"] {
        transform: scale(1.5);
        margin-right: 0.6em;
        vertical-align: middle;
      }

      p {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .image {
        border: none;
        margin: 1.5em 0;
        padding: 0;
        border-radius: 0;
        text-align: center;
      }

      .code,
      code {
        background: rgba(135, 131, 120, 0.15);
        border-radius: 3px;
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-size: 85%;
        tab-size: 2;
      }

      code {
        color: #eb5757;
      }

      .code {
        padding: 1.5em 1em;
      }

      .code-wrap {
        white-space: pre-wrap;
        word-break: break-all;
      }

      .code > code {
        background: none;
        padding: 0;
        font-size: 100%;
        color: inherit;
      }

      blockquote {
        font-size: 1.25em;
        margin: 1em 0;
        padding-left: 1em;
        border-left: 3px solid rgb(55, 53, 47);
      }

      .bookmark {
        text-decoration: none;
        max-height: 8em;
        padding: 0;
        display: flex;
        width: 100%;
        align-items: stretch;
      }

      .bookmark-title {
        font-size: 0.85em;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 1.75em;
        white-space: nowrap;
      }

      .bookmark-text {
        display: flex;
        flex-direction: column;
      }

      .bookmark-info {
        flex: 4 1 180px;
        padding: 12px 14px 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .bookmark-image {
        width: 33%;
        flex: 1 1 180px;
        display: block;
        position: relative;
        object-fit: cover;
        border-radius: 1px;
      }

      .bookmark-description {
        color: rgba(55, 53, 47, 0.6);
        font-size: 0.75em;
        overflow: hidden;
        max-height: 4.5em;
        word-break: break-word;
      }

      .bookmark-href {
        font-size: 0.75em;
        margin-top: 0.25em;
      }

      .sans {
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont,
          "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif,
          "Segoe UI Emoji", "Segoe UI Symbol";
      }
      .code {
        font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono",
          "Liberation Mono", Courier, monospace;
      }
      .serif {
        font-family: Lyon-Text, Georgia, ui-serif, serif;
      }
      .mono {
        font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
      }
      .pdf .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
          "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif,
          "Segoe UI Emoji", "Segoe UI Symbol", "Twemoji", "Noto Color Emoji",
          "Noto Sans CJK JP";
      }
      .pdf:lang(zh-CN) .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
          "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif,
          "Segoe UI Emoji", "Segoe UI Symbol", "Twemoji", "Noto Color Emoji",
          "Noto Sans CJK SC";
      }
      .pdf:lang(zh-TW) .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
          "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif,
          "Segoe UI Emoji", "Segoe UI Symbol", "Twemoji", "Noto Color Emoji",
          "Noto Sans CJK TC";
      }
      .pdf:lang(ko-KR) .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
          "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif,
          "Segoe UI Emoji", "Segoe UI Symbol", "Twemoji", "Noto Color Emoji",
          "Noto Sans CJK KR";
      }
      .pdf .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
          "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
          "Noto Color Emoji", "Noto Sans Mono CJK JP";
      }
      .pdf:lang(zh-CN) .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
          "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
          "Noto Color Emoji", "Noto Sans Mono CJK SC";
      }
      .pdf:lang(zh-TW) .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
          "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
          "Noto Color Emoji", "Noto Sans Mono CJK TC";
      }
      .pdf:lang(ko-KR) .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
          "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
          "Noto Color Emoji", "Noto Sans Mono CJK KR";
      }
      .pdf .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
          "Noto Color Emoji", "Noto Serif CJK JP";
      }
      .pdf:lang(zh-CN) .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
          "Noto Color Emoji", "Noto Serif CJK SC";
      }
      .pdf:lang(zh-TW) .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
          "Noto Color Emoji", "Noto Serif CJK TC";
      }
      .pdf:lang(ko-KR) .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
          "Noto Color Emoji", "Noto Serif CJK KR";
      }
      .pdf .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
          "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK JP";
      }
      .pdf:lang(zh-CN) .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
          "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK SC";
      }
      .pdf:lang(zh-TW) .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
          "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK TC";
      }
      .pdf:lang(ko-KR) .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
          "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK KR";
      }
      .highlight-default {
        color: rgba(55, 53, 47, 1);
      }
      .highlight-gray {
        color: rgba(120, 119, 116, 1);
        fill: rgba(120, 119, 116, 1);
      }
      .highlight-brown {
        color: rgba(159, 107, 83, 1);
        fill: rgba(159, 107, 83, 1);
      }
      .highlight-orange {
        color: rgba(217, 115, 13, 1);
        fill: rgba(217, 115, 13, 1);
      }
      .highlight-yellow {
        color: rgba(203, 145, 47, 1);
        fill: rgba(203, 145, 47, 1);
      }
      .highlight-teal {
        color: rgba(68, 131, 97, 1);
        fill: rgba(68, 131, 97, 1);
      }
      .highlight-blue {
        color: rgba(51, 126, 169, 1);
        fill: rgba(51, 126, 169, 1);
      }
      .highlight-purple {
        color: rgba(144, 101, 176, 1);
        fill: rgba(144, 101, 176, 1);
      }
      .highlight-pink {
        color: rgba(193, 76, 138, 1);
        fill: rgba(193, 76, 138, 1);
      }
      .highlight-red {
        color: rgba(212, 76, 71, 1);
        fill: rgba(212, 76, 71, 1);
      }
      .highlight-gray_background {
        background: rgba(241, 241, 239, 1);
      }
      .highlight-brown_background {
        background: rgba(244, 238, 238, 1);
      }
      .highlight-orange_background {
        background: rgba(251, 236, 221, 1);
      }
      .highlight-yellow_background {
        background: rgba(251, 243, 219, 1);
      }
      .highlight-teal_background {
        background: rgba(237, 243, 236, 1);
      }
      .highlight-blue_background {
        background: rgba(231, 243, 248, 1);
      }
      .highlight-purple_background {
        background: rgba(244, 240, 247, 0.8);
      }
      .highlight-pink_background {
        background: rgba(249, 238, 243, 0.8);
      }
      .highlight-red_background {
        background: rgba(253, 235, 236, 1);
      }
      .block-color-default {
        color: inherit;
        fill: inherit;
      }
      .block-color-gray {
        color: rgba(120, 119, 116, 1);
        fill: rgba(120, 119, 116, 1);
      }
      .block-color-brown {
        color: rgba(159, 107, 83, 1);
        fill: rgba(159, 107, 83, 1);
      }
      .block-color-orange {
        color: rgba(217, 115, 13, 1);
        fill: rgba(217, 115, 13, 1);
      }
      .block-color-yellow {
        color: rgba(203, 145, 47, 1);
        fill: rgba(203, 145, 47, 1);
      }
      .block-color-teal {
        color: rgba(68, 131, 97, 1);
        fill: rgba(68, 131, 97, 1);
      }
      .block-color-blue {
        color: rgba(51, 126, 169, 1);
        fill: rgba(51, 126, 169, 1);
      }
      .block-color-purple {
        color: rgba(144, 101, 176, 1);
        fill: rgba(144, 101, 176, 1);
      }
      .block-color-pink {
        color: rgba(193, 76, 138, 1);
        fill: rgba(193, 76, 138, 1);
      }
      .block-color-red {
        color: rgba(212, 76, 71, 1);
        fill: rgba(212, 76, 71, 1);
      }
      .block-color-gray_background {
        background: rgba(241, 241, 239, 1);
      }
      .block-color-brown_background {
        background: rgba(244, 238, 238, 1);
      }
      .block-color-orange_background {
        background: rgba(251, 236, 221, 1);
      }
      .block-color-yellow_background {
        background: rgba(251, 243, 219, 1);
      }
      .block-color-teal_background {
        background: rgba(237, 243, 236, 1);
      }
      .block-color-blue_background {
        background: rgba(231, 243, 248, 1);
      }
      .block-color-purple_background {
        background: rgba(244, 240, 247, 0.8);
      }
      .block-color-pink_background {
        background: rgba(249, 238, 243, 0.8);
      }
      .block-color-red_background {
        background: rgba(253, 235, 236, 1);
      }
      .select-value-color-pink {
        background-color: rgba(245, 224, 233, 1);
      }
      .select-value-color-purple {
        background-color: rgba(232, 222, 238, 1);
      }
      .select-value-color-green {
        background-color: rgba(219, 237, 219, 1);
      }
      .select-value-color-gray {
        background-color: rgba(227, 226, 224, 1);
      }
      .select-value-color-opaquegray {
        background-color: rgba(255, 255, 255, 0.0375);
      }
      .select-value-color-orange {
        background-color: rgba(250, 222, 201, 1);
      }
      .select-value-color-brown {
        background-color: rgba(238, 224, 218, 1);
      }
      .select-value-color-red {
        background-color: rgba(255, 226, 221, 1);
      }
      .select-value-color-yellow {
        background-color: rgba(253, 236, 200, 1);
      }
      .select-value-color-blue {
        background-color: rgba(211, 229, 239, 1);
      }

      .checkbox {
        display: inline-flex;
        vertical-align: text-bottom;
        width: 16;
        height: 16;
        background-size: 16px;
        margin-left: 2px;
        margin-right: 5px;
      }

      .checkbox-on {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
      }

      .checkbox-off {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
      }`}
        </style>
      </Helmet>
      <article id="36ebb78e-1386-4101-b4d6-6da4bfa1412a" className="page sans">
        <header>
          <h1 className="page-title">Terms of Service</h1>
        </header>
        <div className="page-body">
          <p id="946914c9-66ca-472f-8ebc-07924628c3b1" className="">
            <strong>Last updated June 01, 2022</strong>
          </p>
          <p id="9ce855bb-492e-4ad8-a168-b558af720120" className=""></p>
          <h2 id="406e9854-3764-4121-8bff-3e70d6702f25" className="">
            TABLE OF CONTENTS
          </h2>
          <ol
            type="1"
            id="81effa9c-545c-446c-bda6-d66cf0cd1dc7"
            className="numbered-list"
            start={1}
          >
            <li>AGREEMENT TO TERMS</li>
          </ol>
          <ol
            type="1"
            id="e0a44b95-2136-4474-bd6c-5869d4da1d54"
            className="numbered-list"
            start={2}
          >
            <li>INTELLECTUAL PROPERTY RIGHTS</li>
          </ol>
          <ol
            type="1"
            id="fa75f8c4-d71b-4807-bd0b-d9ba6c5c15ec"
            className="numbered-list"
            start={3}
          >
            <li>USER REPRESENTATIONS</li>
          </ol>
          <ol
            type="1"
            id="03106224-5f3a-440a-952b-a939d6321ee5"
            className="numbered-list"
            start={4}
          >
            <li>USER REGISTRATION</li>
          </ol>
          <ol
            type="1"
            id="150e5d60-edd9-4b1d-98b6-5bb18394de20"
            className="numbered-list"
            start={5}
          >
            <li>PROHIBITED ACTIVITIES</li>
          </ol>
          <ol
            type="1"
            id="d7f8e734-7341-4e45-8443-e7d7dfa8b473"
            className="numbered-list"
            start={6}
          >
            <li>USER GENERATED CONTRIBUTIONS</li>
          </ol>
          <ol
            type="1"
            id="074fdeeb-1b23-4457-85b3-42ad5b58333a"
            className="numbered-list"
            start={7}
          >
            <li>CONTRIBUTION LICENSE</li>
          </ol>
          <ol
            type="1"
            id="ef6f2cd2-dcdc-4e2c-8019-cf0f1655f561"
            className="numbered-list"
            start={8}
          >
            <li>SOCIAL MEDIA</li>
          </ol>
          <ol
            type="1"
            id="44d4d650-8ead-4d07-b82b-435695bdc1f6"
            className="numbered-list"
            start={9}
          >
            <li>SUBMISSIONS</li>
          </ol>
          <ol
            type="1"
            id="da7d619d-10cd-4226-8a84-37b67c518448"
            className="numbered-list"
            start={10}
          >
            <li>THIRD-PARTY WEBSITE AND CONTENT</li>
          </ol>
          <ol
            type="1"
            id="958d49e0-29b3-453f-b445-772cb07069c1"
            className="numbered-list"
            start={11}
          >
            <li>SITE MANAGEMENT</li>
          </ol>
          <ol
            type="1"
            id="6f428521-5199-49f1-a60e-4e1b4fb2d395"
            className="numbered-list"
            start={12}
          >
            <li>PRIVACY POLICY</li>
          </ol>
          <ol
            type="1"
            id="a2e47071-7351-4d79-b5fe-12af4b9c25fc"
            className="numbered-list"
            start={13}
          >
            <li>COPYRIGHT INFRINGEMENTS</li>
          </ol>
          <ol
            type="1"
            id="991c9ae3-c144-4dc9-afc0-2e7dbf215145"
            className="numbered-list"
            start={14}
          >
            <li>TERM AND TERMINATION</li>
          </ol>
          <ol
            type="1"
            id="169b2415-02ea-4cff-be74-f3fd077f0c8a"
            className="numbered-list"
            start={15}
          >
            <li>MODIFICATIONS AND INTERRUPTIONS</li>
          </ol>
          <ol
            type="1"
            id="a9493f06-c319-4961-baaf-a5e77c72dfb2"
            className="numbered-list"
            start={16}
          >
            <li>GOVERNING LAW</li>
          </ol>
          <ol
            type="1"
            id="95ccd21e-e6f6-4a20-80d4-bc7d16d2f0ba"
            className="numbered-list"
            start={17}
          >
            <li>DISPUTE RESOLUTION</li>
          </ol>
          <ol
            type="1"
            id="de95dd40-f6b2-44d5-ba34-665fe2c2d326"
            className="numbered-list"
            start={18}
          >
            <li>CORRECTIONS</li>
          </ol>
          <ol
            type="1"
            id="52615bbf-1b5f-40ae-b31f-0085eb2f4149"
            className="numbered-list"
            start={19}
          >
            <li>DISCLAIMER</li>
          </ol>
          <ol
            type="1"
            id="c05d3be2-4ede-42a8-9fcf-4ecbcb579110"
            className="numbered-list"
            start={20}
          >
            <li>LIMITATIONS OF LIABILITY</li>
          </ol>
          <ol
            type="1"
            id="d738fa52-5ef3-4c33-b99d-41305b5327e3"
            className="numbered-list"
            start={21}
          >
            <li>INDEMNIFICATION</li>
          </ol>
          <ol
            type="1"
            id="aac585a7-3929-4e51-aaea-d08faa4dc0e2"
            className="numbered-list"
            start={22}
          >
            <li>USER DATA</li>
          </ol>
          <ol
            type="1"
            id="c97796ea-0125-4eb6-bb9f-ecb954ca6095"
            className="numbered-list"
            start={23}
          >
            <li>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</li>
          </ol>
          <ol
            type="1"
            id="6c9bfdc5-1a19-482c-afc4-78ac57b9112a"
            className="numbered-list"
            start={24}
          >
            <li>CALIFORNIA USERS AND RESIDENTS</li>
          </ol>
          <ol
            type="1"
            id="9f08f028-30dc-45f4-9f0e-ad78d25f682c"
            className="numbered-list"
            start={25}
          >
            <li>MISCELLANEOUS</li>
          </ol>
          <ol
            type="1"
            id="ec2e74e3-7fdc-4c60-a1af-f7a69a8bf4d4"
            className="numbered-list"
            start={26}
          >
            <li>CONTACT US</li>
          </ol>
          <h2 id="83ef036e-4eae-4c39-8c2e-dd224e7f325c" className="">
            1. AGREEMENT TO TERMS
          </h2>
          <p id="683436f2-a4ba-45cb-aa35-4c1564c3f648" className="">
            These Terms of Use constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity
            (&quot;you&quot;) and Mazury Labs SAS, doing business as Mazury
            (&quot;Mazury,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), concerning your access to and use of the
            <a href="https://mazury.xyz/">https://mazury.xyz</a> website as well
            as any other media form, media channel, mobile website or mobile
            application related, linked, or otherwise connected thereto
            (collectively, the &quot;Site&quot;). Our VAT number is
            FR06901628578. You agree that by accessing the Site, you have read,
            understood, and agreed to be bound by all of these Terms of Use. IF
            YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE
            EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE
            USE IMMEDIATELY.
          </p>
          <p id="de93d374-4d15-47d0-916e-b8c04c4f4b24" className="">
            Supplemental terms and conditions or documents that may be posted on
            the Site from time to time are hereby expressly incorporated herein
            by reference. We reserve the right, in our sole discretion, to make
            changes or modifications to these Terms of Use from time to time. We
            will alert you about any changes by updating the &quot;Last
            updated&quot; date of these Terms of Use, and you waive any right to
            receive specific notice of each such change. Please ensure that you
            check the applicable Terms every time you use our Site so that you
            understand which Terms apply. You will be subject to, and will be
            deemed to have been made aware of and to have accepted, the changes
            in any revised Terms of Use by your continued use of the Site after
            the date such revised Terms of Use are posted.
          </p>
          <p id="28c5f728-3f21-47ad-80c1-4bb9c42b826e" className="">
            The information provided on the Site is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country. Accordingly, those
            persons who choose to access the Site from other locations do so on
            their own initiative and are solely responsible for compliance with
            local laws, if and to the extent local laws are applicable.
          </p>
          <p id="7f073273-dffc-41b9-9e61-bc9efca5a480" className="">
            The Site is not tailored to comply with industry-specific
            regulations (Health Insurance Portability and Accountability Act
            (HIPAA), Federal Information Security Management Act (FISMA), etc.),
            so if your interactions would be subjected to such laws, you may not
            use this Site. You may not use the Site in a way that would violate
            the Gramm-Leach-Bliley Act (GLBA).
          </p>
          <p id="d9f40181-029f-45a3-920e-83d9aaec0793" className="">
            The Site is intended for users who are at least 13 years of age. All
            users who are minors in the jurisdiction in which they reside
            (generally under the age of 18) must have the permission of, and be
            directly supervised by, their parent or guardian to use the Site. If
            you are a minor, you must have your parent or guardian read and
            agree to these Terms of Use prior to you using the Site.
          </p>
          <h2 id="632a992b-cc10-4b86-a24d-ee205b6f6f1c" className="">
            2. INTELLECTUAL PROPERTY RIGHTS
          </h2>
          <p id="cd6ea1b7-81c4-4069-93e4-e773f2f50e1b" className="">
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the &quot;Content) and the trademarks, service marks,
            and logos contained therein (the &quot;Marks&quot;) are owned or
            controlled by us or licensed to us, and are protected by copyright
            and trademark laws and various other intellectual property rights
            and unfair competition laws of the United States, international
            copyright laws, and international conventions. The Content and the
            Marks are provided on the Site &quot;AS IS&quot; for your
            information and personal use only. Except as expressly provided in
            these Terms of Use, no part of the Site and no Content or Marks may
            be copied, reproduced, aggregated, republished, uploaded, posted,
            publicly displayed, encoded, translated, transmitted, distributed,
            sold, licensed, or otherwise exploited for any commercial purpose
            whatsoever, without our express prior written permission.
          </p>
          <p id="2cb80d80-d8ed-40b2-9d9b-08fb8c7a1b7a" className="">
            Provided that you are eligible to use the Site, you are granted a
            limited license to access and use the Site and to download or print
            a copy of any portion of the Content to which you have properly
            gained access solely for your personal, non-commercial use. We
            reserve all rights not expressly granted to you in and to the Site,
            the Content and the Marks.
          </p>
          <h2 id="33b2690e-bbb6-4e62-bbb7-8cafcdd8b4d5" className="">
            3. USER REPRESENTATIONS
          </h2>
          <p id="e819db8c-7df9-4db4-b220-197107afd394" className="">
            By using the Site, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary; (3)
            you have the legal capacity and you agree to comply with these Terms
            of Use; (4) you are not under the age of 13; (5) you are not a minor
            in the jurisdiction in which you reside, or if a minor, you have
            received parental permission to use the Site; (6) you will not
            access the Site through automated or non-human means, whether
            through a bot, script, or otherwise; (7) you will not use the Site
            for any illegal or unauthorized purpose; and (8) your use of the
            Site will not violate any applicable law or regulation.
          </p>
          <p id="a9744784-af41-4d94-8466-5ff9635a3237" className="">
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any and all current or future use of the
            Site (or any portion thereof).
          </p>
          <h2 id="e2e6f35a-45c9-4dae-8994-fc767efe37c5" className="">
            4. USER REGISTRATION
          </h2>
          <p id="b87dd52f-010e-4b63-9369-358407e4a0b5" className="">
            You may be required to register with the Site. You agree to keep
            your password confidential and will be responsible for all use of
            your account and password. We reserve the right to remove, reclaim,
            or change a username you select if we determine, in our sole
            discretion, that such username is inappropriate, obscene, or
            otherwise objectionable.
          </p>
          <h2 id="47594881-81f1-4d7f-9748-1c307a19fb3e" className="">
            5. PROHIBITED ACTIVITIES
          </h2>
          <p id="073c91b9-8658-466f-b4ff-9fa940b9fca1" className="">
            You may not access or use the Site for any purpose other than that
            for which we make the Site available. The Site may not be used in
            connection with any commercial endeavors except those that are
            specifically endorsed or approved by us.
          </p>
          <p id="6469288b-caed-41fb-9670-465d0d1f73c7" className="">
            As a user of the Site, you agree not to:
          </p>
          <ul
            id="32242390-a7c8-4fa2-a699-430c7185b4d3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Systematically retrieve data or other content from the Site to
              create or compile, directly or indirectly, a collection,
              compilation, database, or directory without written permission
              from us.
            </li>
          </ul>
          <ul
            id="2c0246b2-3fed-439a-a017-caf06b3523db"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords. Circumvent, disable, or otherwise interfere with
              security-related features of the Site, including features that
              prevent or restrict the use or copying of any Content or enforce
              limitations on the use of the Site and/or the Content contained
              therein.
            </li>
          </ul>
          <ul
            id="fbda85ad-54b9-45fe-9f58-1ec24ca6a4eb"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or
              the Site.
            </li>
          </ul>
          <ul
            id="5b91100c-d15b-42e1-ac22-b3808b07e621"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Use any information obtained from the Site in order to harass,
              abuse, or harm another person.
            </li>
          </ul>
          <ul
            id="85a0b2fe-b485-4224-8af2-201bbd89b6d9"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Make improper use of our support services or submit false reports
              of abuse or misconduct.
            </li>
          </ul>
          <ul
            id="809e5960-aa16-4df4-83c3-9fe99781cded"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Use the Site in a manner inconsistent with any applicable laws or
              regulations.
            </li>
          </ul>
          <ul
            id="cfdfc264-4828-4191-bb21-f06fc5d69119"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Engage in unauthorized framing of or linking to the Site.
            </li>
          </ul>
          <ul
            id="39329387-eb7a-48c1-939d-90d37a05618a"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Upload or transmit (or attempt to upload or to transmit) viruses,
              Trojan horses, or other material, including excessive use of
              capital letters and spamming (continuous posting of repetitive
              text), that interferes with any party&#x27;s uninterrupted use and
              enjoyment of the Site or modifies, impairs, disrupts, alters, or
              interferes with the use, features, functions, operation, or
              maintenance of the Site.
            </li>
          </ul>
          <ul
            id="be78c26d-388e-48d5-a73a-ff514b576516"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Engage in any automated use of the system, such as using scripts
              to send comments or messages, or using any data mining, robots, or
              similar data gathering and extraction tools.
            </li>
          </ul>
          <ul
            id="e2ed5fdc-527c-4557-9654-cd562842735d"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Delete the copyright or other proprietary rights notice from any
              Content.
            </li>
          </ul>
          <ul
            id="8636f988-b140-4eca-ae42-75e5b7f480c0"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Attempt to impersonate another user or person or use the username
              of another user.
            </li>
          </ul>
          <ul
            id="4d7a301c-21d9-4641-897f-1e204d6dd6d3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Upload or transmit (or attempt to upload or to transmit) any
              material that acts as a passive or active information collection
              or transmission mechanism, including without limitation, clear
              graphics interchange formats (&quot;gifs&quot;), 1×1 pixels, web
              bugs, cookies, or other similar devices (sometimes referred to as
              &quot;spyware&quot; or &quot;passive collection mechanisms&quot;
              or &quot;pcms&quot;).
            </li>
          </ul>
          <ul
            id="0d8ad89c-8633-4523-9aff-25c0ec9c4283"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Interfere with, disrupt, or create an undue burden on the Site or
              the networks or services connected to the Site. Harass, annoy,
              intimidate, or threaten any of our employees or agents engaged in
              providing any portion of the Site to you.
            </li>
          </ul>
          <ul
            id="0f4fb299-4d3b-443d-93cf-0af4b831537f"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Attempt to bypass any measures of the Site designed to prevent or
              restrict access to the Site, or any portion of the Site.
            </li>
          </ul>
          <ul
            id="3f8084c4-3fc2-462d-934c-cbcb50e1eb6b"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Copy or adapt the Site&#x27;s software, including but not limited
              to Flash, PHP, HTML, JavaScript, or other code.
            </li>
          </ul>
          <ul
            id="ebff5484-8f32-4801-b161-26a95103353e"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Except as permitted by applicable law, decipher, decompile,
              disassemble, or reverse engineer any of the software comprising or
              in any way making up a part of the Site.
            </li>
          </ul>
          <ul
            id="09b8ee93-8d2d-4412-9d5d-c4d2b07da7f8"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Except as may be the result of standard search engine or Internet
              browser usage, use, launch, develop, or distribute any automated
              system, including without limitation, any spider, robot, cheat
              utility, scraper, or offline reader that accesses the Site, or
              using or launching any unauthorized script or other software.
            </li>
          </ul>
          <ul
            id="501a0b8b-5771-4607-9188-2c937c1ec2e6"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Use a buying agent or purchasing agent to make purchases on the
              Site.
            </li>
          </ul>
          <ul
            id="e1379c20-555b-4d2b-8d0e-209c4a598b35"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Make any unauthorized use of the Site, including collecting
              usernames and/or email addresses of users by electronic or other
              means for the purpose of sending unsolicited email, or creating
              user accounts by automated means or under false pretenses.
            </li>
          </ul>
          <ul
            id="ca1aed40-65df-41cc-a216-287aa2b12863"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Use the Site as part of any effort to compete with us or otherwise
              use the Site and/or the Content for any revenue-generating
              endeavor or commercial enterprise.
            </li>
          </ul>
          <ul
            id="543f9206-cb61-4691-9851-d2797d0360e8"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Use the Site to advertise or offer to sell goods and services.
            </li>
          </ul>
          <ul
            id="d561ce14-a43c-477f-9ded-4f22ee5d189d"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Sell or otherwise transfer your profile.
            </li>
          </ul>
          <h2 id="dfbfe80e-e325-41fb-b542-2857a15246c2" className="">
            6. USER GENERATED CONTRIBUTIONS
          </h2>
          <p id="2ba26b8b-c313-466c-85d8-c5d7fb6d379a" className="">
            The Site may invite you to chat, contribute to, or participate in
            blogs, message boards, online forums, and other functionality, and
            may provide you with the opportunity to create, submit, post,
            display, transmit, perform, publish, distribute, or broadcast
            content and materials to us or on the Site, including but not
            limited to text, writings, video, audio, photographs, graphics,
            comments, suggestions, or personal information or other material
            (collectively, &quot;Contributions&quot;). Contributions may be
            viewable by other users of the Site and through third-party
            websites. As such, any Contributions you transmit may be treated as
            non-confidential and non-proprietary. When you create or make
            available any Contributions, you thereby represent and warrant that:
          </p>
          <ul
            id="fb17f35b-d7f9-4ab0-85c0-61888dd3382d"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              The creation, distribution, transmission, public display, or
              performance, and the accessing, downloading, or copying of your
              Contributions do not and will not infringe the proprietary rights,
              including but not limited to the copyright, patent, trademark,
              trade secret, or moral rights of any third partv.
            </li>
          </ul>
          <ul
            id="966cd502-da18-4f29-bcb0-7b60877e584f"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              You are the creator and owner of or have the necessary licenses,
              rights, consents, releases, and permissions to use and to
              authorize us, the Site, and other users of the Site to use your
              Contributions in any manner contemplated by the Site and these
              Terms of Use.
            </li>
          </ul>
          <ul
            id="ac9ba6ef-94a4-437a-9653-1699e7a9d62b"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              You have the written consent, release, and/or permission of each
              and every identifiable individual person in your Contributions to
              use the name or likeness of each and every such identifiable
              individual person to enable inclusion and use of your
              Contributions in any manner contemplated by the Site and these
              Terms of Use.
            </li>
          </ul>
          <ul
            id="e0d6a934-eea6-40c5-9db6-ff98f8b595d5"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions are not false, inaccurate, or misleading.
            </li>
          </ul>
          <ul
            id="ddb92b33-8673-406f-9834-340606efef6e"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions are not unsolicited or unauthorized
              advertising, promotional materials, pyramid schemes, chain
              letters, spam, mass mailings, or other forms of solicitation.
            </li>
          </ul>
          <ul
            id="a39c79fd-10cd-4b05-8453-52167d63d05a"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions are not obscene, lewd, lascivious, filthy,
              violent, harassing, libelous, slanderous, or otherwise
              objectionable (as determined by us).
            </li>
          </ul>
          <ul
            id="fa47f740-0d41-4c9f-af3b-64e6b901bd91"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions do not ridicule, mock, disparage, intimidate,
              or abuse anyone.
            </li>
          </ul>
          <ul
            id="13793226-4b04-40d4-8f68-403d66a8a7f3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions are not used to harass or threaten (in the
              legal sense of those terms) any other person and to promote
              violence against a specific person or className of people.
            </li>
          </ul>
          <ul
            id="341f226c-c417-41aa-8db0-55935c11b76e"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions do not violate any applicable law, regulation,
              or rule.
            </li>
          </ul>
          <ul
            id="8d611280-9bad-41d2-b813-dad9cff9ba65"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions do not violate the privacy or publicity rights
              of any third party.
            </li>
          </ul>
          <ul
            id="ff23ec21-f192-4049-a890-47ae4d2dd319"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions do not violate any applicable law concerning
              child pornography, or otherwise intended to protect the health or
              well-being of minors.
            </li>
          </ul>
          <ul
            id="a95d9eb1-f420-484c-b75e-7b7ab3cc289e"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions do not include any offensive comments that are
              connected to race, national origin, gender, sexual preference, or
              physical handicap.
            </li>
          </ul>
          <ul
            id="b4b52336-fa9b-432c-999d-47cab5992aea"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Your Contributions do not otherwise violate, or link to material
              that violates, any provision of these Terms of Use, or any
              applicable law or regulation.
            </li>
          </ul>
          <p id="84f9f9f1-b3a2-4976-be67-caab9a1ff2fa" className="">
            Any use of the Site in violation of the foregoing violates these
            Terms of Use and may result in, among other things, termination or
            suspension of your rights to use the Site.
          </p>
          <h2 id="e6b73e4c-68ea-4200-b554-462b4a0c251d" className="">
            7. CONTRIBUTION LICENSE
          </h2>
          <p id="ee784860-7fa7-4194-958b-3f705d92c9d0" className="">
            By posting your Contributions to any part of the Site or making
            Contributions accessible to the Site by linking your account from
            the Site to any of your social networking accounts, you
            automatically grant, and you represent and warrant that you have the
            right to grant, to us an unrestricted, unlimited, irrevocable,
            perpetual, non-exclusive, transferable, royalty-free, fully-paid,
            worldwide right, and license to host, use, copy, reproduce,
            disclose, sell, resell, publish, broadcast, retitle, archive, store,
            cache, publicly perform, publicly display, reformat, translate,
            transmit, excerpt (in whole or in part), and distribute such
            Contributions (including, without limitation, your image and voice)
            for any purpose, commercial, advertising, or otherwise, and to
            prepare derivative works of, or incorporate into other works, such
            Contributions, and grant and authorize sublicenses of the foregoing.
            The use and distribution may occur in any media formats and through
            any media channels.
          </p>
          <p id="94e86f3f-882c-4753-b52c-2c893995c667" className="">
            This license will apply to any form, media, or technology now known
            or hereafter developed, and includes our use of your name, company
            name, and franchise name, as applicable, and any of the trademarks,
            service marks, trade names, logos, and personal and commercial
            images you provide.
          </p>
          <p id="5620e317-ad2b-4b14-9236-422e84085055" className="">
            You waive all moral rights in your Contributions, and you warrant
            that moral rights have not otherwise been asserted in your
            Contributions.
          </p>
          <p id="4e23804f-4a89-4824-8b6e-011fe4379b97" className="">
            We do not assert any ownership over your Contributions. You retain
            full ownership of all of your Contributions and any intellectual
            property rights or other proprietary rights associated with your
            Contributions. We are not liable for any statements or
            representations in your Contributions provided by you in any area on
            the Site. You are solely responsible for your Contributions to the
            Site and you expressly agree to exonerate us from any and all
            responsibility and to refrain from any legal action against us
            regarding your Contributions.
          </p>
          <p id="66d5bad6-9101-4ea8-b22e-6a9f92148500" className="">
            We have the right, in our sole and absolute discretion, (1) to edit,
            redact, or otherwise change any Contributions; (2) to re-categorize
            any Contributions to place them in more appropriate locations on the
            Site; and (3) to pre-screen or delete any Contributions at any time
            and for any reason, without notice. We have no obligation to monitor
            your Contributions.
          </p>
          <h2 id="0326f951-e541-4c65-bd93-d3b24d0587bf" className="">
            8. SOCIAL MEDIA
          </h2>
          <p id="021f71b4-a31b-4abe-b220-45a0d0bf9e3f" className="">
            As part of the functionality of the Site, you may link your account
            with online accounts you have with third-party service providers
            (each such account, a &quot;Third-Party Account&quot;) by either:
            (1) providing your Third-Party Account login information through the
            Site; or (2) allowing us to access your Third-Party Account, as is
            permitted under the applicable terms and conditions that govern your
            use of each Third-Party Account. You represent and warrant that you
            are entitled to disclose your Third-Party Account login information
            to us and/or grant us access to your Third-Party Account, without
            breach by you of any of the terms and conditions that govern your
            use of the applicable Third-Party Account, and without obligating us
            to pay any fees or making us subject to any usage limitations
            imposed by the third-party service provider of the Third-Party
            Account. By granting us access to any Third-Party Accounts, you
            understand that (1) we may access, make available, and store (if
            applicable) any content that you have provided to and stored in your
            Third-Party Account (the &quot;Social Network Content&quot;) so that
            it is available on and through the Site via your account, including
            without limitation any friend lists and (2) we may submit to and
            receive from your Third-Party Account additional information to the
            extent you are notified when you link your account with the
            Third-Party Account. Depending on the Third-Party Accounts you
            choose and subject to the privacy settings that you have set in such
            Third-Party Accounts, personally identifiable information that you
            post to your Third-Party Accounts may be available on and through
            your account on the Site. Please note that if a Third-Party Account
            or associated service becomes unavailable or our access to such
            Third Party Account is terminated by the third-party service
            provider, then Social Network Content may no longer be available on
            and through the Site. You will have the ability to disable the
            connection between your account on the Site and your Third-Party
            Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE
            THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY
            ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH
            THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any
            Social Network Content for any purpose, including but not limited
            to, for accuracy, legality, or non-infringement, and we are not
            responsible for any Social Network Content. You acknowledge and
            agree that we may access your email address book associated with a
            Third-Party Account and your contacts list stored on your mobile
            device or tablet computer solely for purposes of identifying and
            informing you of those contacts who have also registered to use the
            Site. You can deactivate the connection between the Site and your
            Third-Party Account by contacting us using the contact information
            below or through your account settings (if applicable). We will
            attempt to delete any information stored on our servers that was
            obtained through such Third-Party Account, except the username and
            profile picture that become associated with your account.
          </p>
          <h2 id="13902af0-7737-4f1d-9c92-c64177238397" className="">
            9. SUBMISSIONS
          </h2>
          <p id="f64232cd-d343-49a7-9d6b-2e5b80e6c264" className="">
            You acknowledge and agree that any questions, comments, suggestions,
            ideas, feedback, or other information regarding the Site
            (&quot;Submissions) provided by you to us are non-confidential and
            shall become our sole property. We shall own exclusive rights,
            including all intellectual property rights, and shall be entitled to
            the unrestricted use and dissemination of these Submissions for any
            lawful purpose, commercial or otherwise, without acknowledgment or
            compensation to you. You hereby waive all moral rights to any such
            Submissions, and you hereby warrant that any such Submissions are
            original with you or that you have the right to submit such
            Submissions. You agree there shall be no recourse against us for any
            alleged or actual infringement or misappropriation of any
            proprietary right in your Submissions.
          </p>
          <h2 id="69864db5-d164-4056-8df5-8ca816f8e0a4" className="">
            10. THIRD-PARTY WEBSITE AND CONTENT
          </h2>
          <p id="e56e1318-4eb5-4c36-8484-a1020a4f66cc" className="">
            The Site may contain (or you may be sent via the Site) links to
            other websites (&quot;Third-Party Websites&quot;) as well as
            articles, photographs, text, graphics, pictures, designs, music,
            sound, video, information, applications, software, and other content
            or items belonging to or originating from third parties
            (&quot;Third-Party Content&quot;). Such Third-Party Websites and
            Third-Party Content are not investigated, monitored, or checked for
            accuracy, appropriateness, or completeness by us, and we are not
            responsible for any Third-Party Websites accessed through the Site
            or any Third-Party Content posted on, available through, or
            installed from the Site, including the content, accuracy,
            offensiveness, opinions, reliability, privacy practices, or other
            policies of or contained in the Third-Party Websites or the
            Third-Party Content. Inclusion of, linking to, or permitting the use
            or installation of any Third-Party Websites or any Third-Party
            Content does not imply approval or endorsement thereof by us. If you
            decide to leave the Site and access the Third-Party Websites or to
            use or install any Third-Party Content, you do so at your own risk,
            and you should be aware these Terms of Use no longer govern. You
            should review the applicable terms and policies, including privacy
            and data gathering practices, of any website to which you navigate
            from the Site or relating to any applications you use or install
            from the Site. Any purchases you make through Third-Party Websites
            will be through other websites and from other companies, and we take
            no responsibility whatsoever in relation to such purchases which are
            exclusively between you and the applicable third party. You agree
            and acknowledge that we do not endorse the products or services
            offered on Third-Party Websites and vou shall hold us harmless from
            any harm caused by your purchase of such products or services.
            Additionally, you shall hold us harmless from any losses sustained
            by you or harm caused to you relating to or resulting in any way
            from any Third-Party Content or any contact with Third-Party
            Websites.
          </p>
          <h2 id="13aae4c8-772a-4ab9-a7c7-1780f5cd262a" className="">
            11. SITE MANAGEMENT
          </h2>
          <p id="b90d70ef-a97a-45f2-af0f-f2f4b9925b78" className="">
            We reserve the right, but not the obligation, to: (1) monitor the
            Site for violations of these Terms of Use; (2) take appropriate
            legal action against anyone who, in our sole discretion, violates
            the law or these Terms of Use, including without limitation,
            reporting such user to law enforcement authorities; (3) in our sole
            discretion and without limitation, refuse, restrict access to, limit
            the availability of, or disable (to the extent technologically
            feasible) any of your Contributions or any portion thereof; (4) in
            our sole discretion and without limitation, notice, or liability, to
            remove from the Site or otherwise disable all files and content that
            are excessive in size or are in any way burdensome to our systems;
            and (5) otherwise manage the Site in a manner designed to protect
            our rights and property and to facilitate the proper functioning of
            the Site.
          </p>
          <h2 id="9712264a-fb15-439d-bd5b-3b0597b55377" className="">
            12. PRIVACY POLICY
          </h2>
          <p id="bb725f2d-fae4-49d2-a1db-e576da54950b" className="">
            We care about data privacy and security. Please review our Privacy
            Policy: mazury.xyz/privacy-policy. By using the Site, you agree to
            be bound by our Privacy Policy, which is incorporated into these
            Terms of Use. Please be advised the Site is hosted in Germany. If
            you access the Site from any other region of the world with laws or
            other requirements governing personal data collection, use, or
            disclosure that differ from applicable laws in Germany, then through
            your continued use of the Site, you are transferring your data to
            Germany, and you agree to have your data transferred to and
            processed in Germany. Further, we do not knowingly accept, request,
            or solicit information from children or knowingly market to
            children. Therefore, in accordance with the U.S. Children&#x27;s
            Online Privacy Protection Act, if we receive actual knowledge that
            anyone under the age of 13 has provided personal information to us
            without the requisite and verifiable parental consent, we will
            delete that information from the Site as quickly as is reasonably
            practical.
          </p>
          <h2 id="7118b090-76e1-4b43-9554-b80b9c321980" className="">
            13. COPYRIGHT INFRINGEMENTS
          </h2>
          <p id="be585513-0a95-46ae-9fc5-b65750525abf" className="">
            We respect the intellectual property rights of others. If you
            believe that any material available on or through the Site infringes
            upon any copyright you own or control, please immediately notify us
            using the contact information provided below (a
            &quot;Notification&quot;). A copy of your Notification will be sent
            to the person who posted or stored the material addressed in the
            Notification. Please be advised that pursuant to applicable law you
            may be held liable for damages if you make material
            misrepresentations in a Notification. Thus, if you are not sure that
            material located on or linked to by the Site infringes your
            copyright, you should consider first contacting an attorney.
          </p>
          <h2 id="f31fbfa0-0fa4-4765-9a23-74d68aa8e886" className="">
            14. TERM AND TERMINATION
          </h2>
          <p id="b3cc415e-2c8c-485d-811a-41b2bcaa2bac" className="">
            These Terms of Use shall remain in full force and effect while you
            use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF
            USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
            NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING
            BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR
            NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
            REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF
            USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
            USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY
            CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING,
            IN OUR SOLE DISCRETION. If we terminate or suspend your account for
            any reason, you are prohibited from registering and creating a new
            account under your name, a fake or borrowed name, or the name of any
            third party, even if you may be acting on behalf of the third party.
            In addition to terminating or suspending your account, we reserve
            the right to take appropriate legal action, including without
            limitation pursuing civil, criminal, and injunctive redress.
          </p>
          <h2 id="65c4850c-c7b6-45fb-9b4e-e0a1d1fa7a4f" className="">
            15. MODIFICATIONS AND INTERRUPTIONS
          </h2>
          <p id="c643fc5d-2a79-49ab-96e8-f9efda5ff2ea" className="">
            We reserve the right to change, modify, or remove the contents of
            the Site at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our Site. We also reserve the right to modify or
            discontinue all or part of the Site without notice at any time. We
            will not be liable to you or any third party for any modification,
            price change, suspension, or discontinuance of the Site. We cannot
            guarantee the Site will be available at all times. We may experience
            hardware, software, or other problems or need to perform maintenance
            related to the Site, resulting in interruptions, delays, or errors.
            We reserve the right to change, revise, update, suspend,
            discontinue, or otherwise modify the Site at any time or for any
            reason without notice to you. You agree that we have no liability
            whatsoever for any loss, damage, or inconvenience caused by your
            inability to access or use the Site during any downtime or
            discontinuance of the Site. Nothing in these Terms of Use will be
            construed to obligate us to maintain and support the Site or to
            supply any corrections, updates, or releases in connection
            therewith.
          </p>
          <h2 id="8ab2fbc2-661a-41b9-93e5-7be32d4d0786" className="">
            16. GOVERNING LAW
          </h2>
          <p id="10ed0532-aff4-40c0-aab2-ea1e3b50f8ea" className="">
            These conditions are governed by and interpreted following the laws
            of France, and the use of the United Nations Convention of Contracts
            for the International Sale of Goods is expressly excluded. If your
            habitual residence is in the EU, and you are a consumer, you
            additionally possess the protection provided to you by obligatory
            provisions of the law of your country of residence. Mazury Labs SAS
            and yourself both agree to submit to the non-exclusive jurisdiction
            of the courts of Paris, which means that you may make a claim to
            defend your consumer protection rights in regards to these Terms of
            Use in France, or in the EU country in which you reside.
          </p>
          <h2 id="2349103b-9fab-4d86-a878-f6c4001a8784" className="">
            17. DISPUTE RESOLUTION
          </h2>
          <h3 id="d297bd1b-7227-4ea3-a12b-c85c9c15242e" className="">
            Informal Negotiations
          </h3>
          <p id="ae9e55ff-c8e4-445a-aee1-2d80adb7861d" className="">
            To expedite resolution and control the cost of any dispute,
            controversy, or claim related to these Terms of Use (each
            &quot;Dispute&quot; and collectively, the &quot;Disputes&quot;)
            brought by either you or us (individually, a &quot;Party&quot; and
            collectively, the &quot;Parties&quot;), the Parties agree to first
            attempt to negotiate any Dispute (except those Disputes expressly
            provided below) informally for at least forty (40) days before
            initiating arbitration. Such informal negotiations commence upon
            written notice from one Party to the other Party.
          </p>
          <h3 id="179ef47b-0bfa-43a0-8046-bf367281c101" className="">
            Binding Arbitration
          </h3>
          <p id="f1a581fe-f2ed-4652-9c1d-da181ec510c4" className="">
            Any dispute arising from the relationships between the Parties to
            this contract shall be determined by one arbitrator who will be
            chosen in accordance with the Arbitration and Internal Rules of the
            European Court of Arbitration being part of the European Centre of
            Arbitration having its seat in Strasbourg, and which are in force at
            the time the application for arbitration is filed, and of which
            adoption of this clause constitutes acceptance. The seat of
            arbitration shall be Paris, France, France. The language of the
            proceedings shall be English. Applicable rules of substantive law
            shall be the law of France.
          </p>
          <h3 id="496f19b2-59b6-4e70-8f50-868569d36490" className="">
            Restrictions
          </h3>
          <p id="f0769bfa-71f7-4f61-bc9b-5c19f48e18af" className="">
            The Parties agree that any arbitration shall be limited to the
            Dispute between the Parties individually. To the full extent
            permitted by law, (a) no arbitration shall be joined with any other
            proceeding; (b) there is no right or authority for any Dispute to be
            arbitrated on a className-action basis or to utilize className
            action procedures; and (c) there is no right or authority for any
            Dispute to be brought in a purported representative capacity on
            behalf of the general public or any other persons.
          </p>
          <h3 id="1b1cbd79-48fc-48b1-b943-75b190c23364" className="">
            Exceptions to Informal Negotiations and Arbitration
          </h3>
          <p id="c037df66-6c59-447e-871a-90878fcbff0a" className="">
            The Parties agree that the following Disputes are not subject to the
            above provisions concerning informal negotiations and binding
            arbitration: (a) any Disputes seeking to enforce or protect, or
            concerning the validity of, any of the intellectual property rights
            of a Party; (b) any Dispute related to, or arising from, allegations
            of theft, piracy, invasion of privacy, or unauthorized use; and (c)
            any claim for injunctive relief. If this provision is found to be
            illegal or unenforceable, then neither Party will elect to arbitrate
            any Dispute falling within that portion of this provision found to
            be illegal or unenforceable and such Dispute shall be decided by a
            court of competent jurisdiction within the courts listed for
            jurisdiction above, and the Parties agree to submit to the personal
            jurisdiction of that court.
          </p>
          <h2 id="b8342284-3e42-437e-9e80-30cc999c264d" className="">
            18. CORRECTIONS
          </h2>
          <p id="ebb66187-4bc2-4989-adf5-deb54b4b6111" className="">
            There may be information on the Site that contains typographical
            errors, inaccuracies, or omissions, including descriptions, pricing,
            availability, and various other information. We reserve the right to
            correct any errors, inaccuracies, or omissions and to change or
            update the information on the Site at any time, without prior
            notice.
          </p>
          <h2 id="8d6468f3-05e5-4479-81a2-b897f9cd04ed" className="">
            19. DISCLAIMER
          </h2>
          <p id="e311c4f8-7747-4e3f-b02d-92372e24d242" className="">
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
            THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE
            RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
            WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR
            USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES
            OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
            ACCURACY OR COMPLETENESS OF THE SITE&#x27;S CONTENT OR THE CONTENT
            OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY
            OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF
            CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF
            ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
            SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
            AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
            STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO
            OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
            WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY,
            AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR
            FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE
            OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
            THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
            RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A
            THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY
            WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
            ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
            RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
            THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE
            OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT,
            YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE
            APPROPRIATE.
          </p>
          <h2 id="5654019d-6d30-4cbc-9c70-4347c806a14c" className="">
            20. LIMITATIONS OF LIABILITY
          </h2>
          <p id="f22152c4-5c23-4e5b-b2dd-76af4dd54f24" className="">
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
            TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
            EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
            PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM
            YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE
            CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE
            WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL
            TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE
            SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN
            US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON
            IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN
            DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE
            DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE
            ADDITIONAL RIGHTS.
          </p>
          <h2 id="90740c3d-9440-4dbf-9025-c77d28ef23fe" className="">
            21. INDEMNIFICATION
          </h2>
          <p id="d5747e06-0f90-40d6-9dac-e696f59ba424" className="">
            You agree to defend, indemnify, and hold us harmless, including our
            subsidiaries, affiliates, and all of our respective officers,
            agents, partners, and employees, from and against any loss, damage,
            liability, claim, or demand, including reasonable attorneys&#x27;
            fees and expenses, made by any third party due to or arising out of:
            (1) your Contributions; (2) use of the Site; (3) breach of these
            Terms of Use; (4) any breach of your representations and warranties
            set forth in these Terms of Use; (5) your violation of the rights of
            a third party, including but not limited to intellectual property
            rights; or (6) any overt harmful act toward any other user of the
            Site with whom you connected via the Site. Notwithstanding the
            foregoing, we reserve the right, at your expense, to assume the
            exclusive defense and control of any matter for which you are
            required to indemnify us, and you agree to cooperate, at your
            expense, with our defense of such claims. We will use reasonable
            efforts to notify you of any such claim, action, or proceeding which
            is subject to this indemnification upon becoming aware of it.
          </p>
          <h2 id="641e77d3-72a9-4170-aa92-b5e415536a00" className="">
            22. USER DATA
          </h2>
          <p id="97a83b2f-9c90-4ef7-8c7a-1619b72f6690" className="">
            We will maintain certain data that you transmit to the Site for the
            purpose of managing the performance of the Site, as well as data
            relating to your use of the Site. Although we perform regular
            routine backups of data, you are solely responsible for all data
            that you transmit or that relates to any activity you have
            undertaken using the Site. You agree that we shall have no liability
            to you for any loss or corruption of any such data, and you hereby
            waive any right of action against us arising from any such loss or
            corruption of such data.
          </p>
          <h2 id="ed12865b-ca79-4fdf-b57f-06395dd57746" className="">
            23. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
          </h2>
          <p id="02306f4f-bc4a-4e77-a7ef-b6da12c70a1f" className="">
            Visiting the Site, sending us emails, and completing online forms
            constitute electronic communications. You consent to receive
            electronic communications, and you agree that all agreements,
            notices, disclosures, and other communications we provide to you
            electronically, via email and on the Site, satisfy any legal
            requirement that such communication be in writing. YOU HEREBY AGREE
            TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER
            RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
            RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
            SITE. You hereby waive any rights or requirements under any
            statutes, regulations, rules, ordinances, or other laws in any
            jurisdiction which require an original signature or delivery or
            retention of non-electronic records, or to payments or the granting
            of credits by any means other than electronic means.
          </p>
          <h2 id="a5f9cc67-4c55-4942-b657-98529ca6bb13" className="">
            24. CALIFORNIA USERS AND RESIDENTS
          </h2>
          <p id="c6b43b10-596a-4ee7-b02d-b91ce9e0ef23" className="">
            If any complaint with us is not satisfactorily resolved, you can
            contact the Complaint Assistance Unit of the Division of Consumer
            Services of the California Department of Consumer Affairs in writing
            at 1625 North Market Blvd., Suite N 112, Sacramento, California
            95834 or by telephone at (800) 952-5210 or (916) 445-1254.
          </p>
          <h2 id="fcc8d7ca-d949-4564-ada0-d5feac11a412" className="">
            25. MISCELLANEOUS
          </h2>
          <p id="30e14f4b-7bd7-42e8-9a70-b532f6ded0d2" className="">
            These Terms of Use and any policies or operating rules posted by us
            on the Site or in respect to the Site constitute the entire
            agreement and understanding between you and us. Our failure to
            exercise or enforce any right or provision of these Terms of Use
            shall not operate as a waiver of such right or provision. These
            Terms of Use operate to the fullest extent permissible by law. We
            may assign any or all of our rights and obligations to others at any
            time. We shall not be responsible or liable for any loss, damage,
            delay, or failure to act caused by any cause beyond our reasonable
            control. If any provision or part of a provision of these Terms of
            Use is determined to be unlawful, void, or unenforceable, that
            provision or part of the provision is deemed severable from these
            Terms of Use and does not affect the validity and enforceability of
            any remaining provisions. There is no joint venture, partnership,
            employment or agency relationship created between you and us as a
            result of these Terms of Use or use of the Site. You agree that
            these Terms of Use will not be construed against us by virtue of
            having drafted them. You hereby waive any and all defenses you may
            have based on the electronic form of these Terms of Use and the lack
            of signing by the parties hereto to execute these Terms of Use.
          </p>
          <h2 id="c6cf094e-6325-4407-9c56-c3b5b95adbcb" className="">
            26. CONTACT US
          </h2>
          <p id="2470b1df-c7ff-4833-a77b-ef5dd72500c2" className="">
            In order to resolve a complaint regarding the Site or to receive
            further information regarding use of the Site, please contact us at:
            Mazury Labs SAS 3 RUE JULES GUESDE RIS ORANGIS, Paris 91130 France
            support@mazury.xyz
          </p>
        </div>
      </article>
    </>
  );
};

export default TermsOfService;
