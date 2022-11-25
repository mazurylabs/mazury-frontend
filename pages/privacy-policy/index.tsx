import * as React from 'react';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';
import { useIsOnboarded } from '@/hooks';

const PrivacyPolicy = () => {
  useIsOnboarded();
  const router = useRouter();

  return (
    <div>
      <Helmet>
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
          margin: 0 auto;
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

      <Link href="/">
        <a className="fixed top-6 left-4 hidden xl:block">
          <span className="sr-only">Home</span>
          <SVG height={40} width={40} src="/icons/mazury-logo.svg" />
        </a>
      </Link>

      <div
        id="e926e4db-5c13-4be8-984d-5068640975de"
        className="page sans px-4 lg:px-0"
      >
        <div className="sticky top-0 space-y-4 bg-white pt-4 pb-1 sm:pt-20">
          <button
            type="button"
            onClick={() => router.back()}
            className="self-start"
          >
            <SVG src="/icons/arrow-left.svg" height={24} width={24} />
            <span className="sr-only">Go back</span>
          </button>
          <h1 className="font-sansMid text-sm font-medium">Privacy Policy</h1>
        </div>

        <div className="page-body">
          <p id="530ca396-3068-4b98-af54-0d66b80d23c5" className="">
            <strong>Last updated June 01, 2022</strong>
          </p>
          <p id="677162e3-4fbf-4aec-9a72-b82ab07b40ac" className=""></p>
          <p id="99ad6783-5c75-4609-8001-52c5f9f29225" className="">
            This privacy notice for Mazury Labs SAS (doing business as Mazury)
            (&#x27;Mazury&#x27;, &#x27;we&#x27;,&#x27;us&#x27;, or
            &#x27;our&#x27;,), describes how and why we might collect, store,
            use, and/or share (process&#x27;) your information when you use our
            services (&#x27;Services&#x27;), such as when you:
          </p>

          <ul
            id="329f98dc-1d74-4b68-a416-4cb9dc252675"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Visit our website at https://mazury.xyz, or any website of ours
              that links to this privacy notice
            </li>
          </ul>
          <ul
            id="9c8beb64-9a51-4027-9b87-87c5767432a6"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Engage with us in other related ways, including any sales,
              marketing, or events
            </li>
          </ul>
          <p id="7cbb27ca-df6c-4bcb-9f1d-887e778c48f0" className="">
            Questions or concerns? Reading this privacy notice will help you
            understand your privacy rights and choices. If you do not agree with
            our policies and practices, please do not use our Services. If you
            still have any questions or concerns, please contact us at
            support@mazury.xyz.
          </p>
          <p id="293f5e92-8833-4159-bd9b-f50e1bee54ab" className=""></p>
          <h2 id="7d0d1537-6b2c-4bad-bcc4-731801129531" className="">
            SUMMARY OF KEY POINTS
          </h2>
          <p id="048bbec5-9152-401d-88c4-1f1bdbb00b51" className="">
            <strong>
              This summary provides key points from our privacy notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our table of
              contents below to find the section you are looking for.
            </strong>
          </p>
          <p id="954216d3-b5b2-409f-a7f0-c5b83209c965" className="">
            <strong>What personal information do we process? </strong>When you
            visit, use, or navigate our Services, we may process personal
            information depending on how you interact with Mazury and the
            Services, the choices you make, and the products and features you
            use.
          </p>
          <p id="e3e746c3-cb49-4770-ae6c-95c5194e71f3" className="">
            <strong>Do we process any sensitive personal information? </strong>
            We do not process sensitive personal information.
          </p>
          <p id="eb0abbf1-3ac4-4eac-9e97-20bac3777db3" className="">
            <strong>Do we receive any information from third parties?</strong>{' '}
            We do not receive any information from third parties.
          </p>
          <p id="c1293900-5c15-41aa-ac11-039bc9bb6dae" className="">
            <strong>How do we process your information? </strong>We process your
            information to provide, improve, and administer our Services,
            communicate with you, for security and fraud prevention, and to
            comply with law. We may also process your information for other
            purposes with your consent. We process your information only when we
            have a valid legal reason to do so.
          </p>
          <p id="6721ee75-73f6-4b7a-a175-c506a38fb39c" className=""></p>
          <p id="958e3fda-cb01-48bb-96cb-cf488c0e6960" className="">
            <strong>
              In what situations and with which parties do we share personal
              information?{' '}
            </strong>
            We may share information in specific situations and with specific
            third parties. Click here to learn more.
            <strong>How do we keep your information safe? </strong>We have
            organisational and technical processes and procedures in place to
            protect your personal information. However, no electronic
            transmission over the internet or information storage technology can
            be guaranteed to be 100% secure, so we cannot promise or guarantee
            that hackers, cybercriminals, or other unauthorised third parties
            will not be able to defeat our security and improperly collect,
            access, steal, or modify your information.
          </p>
          <p id="70f93945-a61f-494c-8580-997e9e4e6317" className="">
            <strong>What are your rights? </strong>Depending on where you are
            located geographically, the applicable privacy law may mean you have
            certain rights regarding your personal information. Click here to
            learn more.
          </p>
          <p id="3abe18da-a316-4d22-a819-0b582a621501" className="">
            <strong>How do you exercise your rights? </strong>The easiest way to
            exercise your rights is by contacting us. We will consider and act
            upon any request in accordance with applicable data protection laws.
          </p>
          <p id="439f117f-5fc4-4f76-a86f-6d404e1ed844" className=""></p>
          <h2 id="849aa44d-a020-4d74-b3c1-eba85bd1e3cf" className="">
            TABLE OF CONTENTS
          </h2>
          <ol
            type="1"
            id="3d7042fe-9b07-40a6-b3e3-7a14e502b0d2"
            className="numbered-list"
            start={1}
          >
            <li>WHAT INFORMATION DO WE COLLECT?</li>
          </ol>
          <ol
            type="1"
            id="c1db6ea5-c926-46fa-bd6f-c8e9f42c61dc"
            className="numbered-list"
            start={2}
          >
            <li>HOW DO WE PROCESS YOUR INFORMATION?</li>
          </ol>
          <ol
            type="1"
            id="04baee0d-7d72-4d4a-be43-965695623466"
            className="numbered-list"
            start={3}
          >
            <li>
              WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
              INFORMATION?
            </li>
          </ol>
          <ol
            type="1"
            id="7c2c4ce7-1188-4a4e-a5e0-7848e410f24d"
            className="numbered-list"
            start={4}
          >
            <li>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
          </ol>
          <ol
            type="1"
            id="f6b06469-cf66-4550-9bf1-5923e8698317"
            className="numbered-list"
            start={5}
          >
            <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
          </ol>
          <ol
            type="1"
            id="e326abfe-878e-43de-8e6c-6ac9608ac0e5"
            className="numbered-list"
            start={6}
          >
            <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
          </ol>
          <ol
            type="1"
            id="ce4422ba-c55a-4b61-b029-0198acb97c45"
            className="numbered-list"
            start={7}
          >
            <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
          </ol>
          <ol
            type="1"
            id="5f795c48-2625-4310-b61e-36ac38e7b9f4"
            className="numbered-list"
            start={8}
          >
            <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
          </ol>
          <ol
            type="1"
            id="310fa518-8065-47f8-ba6f-5011f2c7bf9e"
            className="numbered-list"
            start={9}
          >
            <li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
          </ol>
          <ol
            type="1"
            id="6fc1581f-1ec9-4799-b31a-268e55bcaa5b"
            className="numbered-list"
            start={10}
          >
            <li>DO WE MAKE UPDATES TO THIS NOTICE?</li>
          </ol>
          <ol
            type="1"
            id="73e9a661-34d9-40cb-963d-d111950af6ee"
            className="numbered-list"
            start={11}
          >
            <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
          </ol>
          <ol
            type="1"
            id="d9e864c0-77c5-46bf-a188-6be8b9742fea"
            className="numbered-list"
            start={12}
          >
            <li>
              HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </li>
          </ol>

          <h3 id="621dec6d-fd03-42c1-8da5-0fe692fa2d17" className="">
            1. WHAT INFORMATION DO WE COLLECT?
          </h3>
          <p id="2c21bcc4-d239-4a18-9d16-41c7d3964157" className="">
            <strong>Personal information you disclose to us</strong>
          </p>
          <p id="72ad2776-31ec-41dc-90f1-b522c542ab46" className="">
            <strong>In Short:</strong> We collect personal information that you
            provide to us.
          </p>
          <p id="0824f59e-4335-44bc-94f0-32043506ae43" className="">
            We collect personal information that you voluntarily provide to us
            when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Services, or otherwise when you
            contact us.
          </p>
          <p id="31e15996-6479-4d99-83de-70b167df16cf" className=""></p>
          <p id="57f9a131-dedd-4d66-9b0d-73916b9badfa" className="">
            <strong>Personal Information Provided by You.</strong> The personal
            information that we collect depends on the context of your
            interactions with us and the Services, the choices you make, and the
            products and features you use. The personal information we collect
            may include the following:
          </p>
          <ul
            id="18dd822d-2644-47df-bf8e-91a206d04f6d"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>names</li>
          </ul>
          <ul
            id="e81f16d8-bc6f-43bf-8a2d-436535b566f3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>email addresses</li>
          </ul>
          <ul
            id="07d9b3d0-3515-410f-9ca6-8fe278c1906c"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>job titles</li>
          </ul>
          <ul
            id="407b8b79-4e81-4ef0-a914-64af8b8d0057"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>usernames</li>
          </ul>
          <ul
            id="35fb14b7-d98e-4ddc-951d-d0673c97fb2c"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>contact preferences</li>
          </ul>
          <ul
            id="555db368-35ec-4ae1-8c87-4bf35017d13d"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>location</li>
          </ul>
          <ul
            id="ed800987-127b-489f-b1db-04f56820bcbf"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>profile picture</li>
          </ul>
          <ul
            id="df96b500-9841-4152-bfbe-be30e0f33d69"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>web3 wallet address</li>
          </ul>
          <p id="eed9014c-ba80-4239-b0e0-9e8473084e11" className="">
            <strong>Sensitive Information</strong>. We do not process sensitive
            information.
          </p>
          <p id="c2acc62f-054c-4193-9821-04d95793a188" className="">
            <strong>Payment Data. </strong>We may collect data necessary to
            process your payment if you make purchases, such as your payment
            instrument number, and the security code associated with your
            payment instrument.
          </p>
          <p id="8a3bb245-ed3e-46ba-8086-4bb56a0b2462" className="">
            All payment data is stored by Stripe. You may find their privacy
            notice link(s) here:
            <a href="https://stripe.com/it/privacy">
              https://stripe.com/it/privacy
            </a>
            .
          </p>
          <p id="396596af-3945-4b65-9b48-c3b6821de925" className="">
            All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
          </p>
          <p id="a2146032-ac11-4df3-9355-94ebaddf79b6" className=""></p>
          <h3 id="05d0d03e-84ca-46ab-afdb-4ca2d3900de1" className="">
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </h3>
          <p id="05727f2c-7bbe-4831-8fe4-0d90f5984a09" className="">
            <strong>In Short: </strong>We process your information to provide,
            improve, and administer our Services, communicate with you, for
            security and fraud prevention, and to comply with law. We may also
            process your information for other purposes with your consent.
          </p>
          <p id="b61c647a-8627-4236-ac22-574b8574ffa8" className="">
            <strong>
              We process your personal information for a variety of reasons,
              depending on how you interact with our Services, including:
            </strong>
          </p>
          <ul
            id="387ebb95-e9bc-4097-a344-d310863a2c1d"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>
                To facilitate account creation and authentication and otherwise
                manage user accounts.
              </strong>
              We may process your information so you can create and log in to
              your account, as well as keep your account in working order.
            </li>
          </ul>
          <ul
            id="a7964fef-28a2-4a83-8a86-25c84df839cf"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>
                To respond to user inquiries/offer support to users.
              </strong>
              We may process your information to respond to your inquiries and
              solve any potential issues you might have with the requested
              service.
            </li>
          </ul>
          <ul
            id="10375f45-c630-4a6c-8236-56a1062a4db3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>To send administrative information to you. </strong>We may
              process your information to send you details about our products
              and services, changes to our terms and policies, and other similar
              information.
            </li>
          </ul>
          <ul
            id="2154d236-a013-43a7-a33d-b37553ac364a"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>To enable user-to-user communications.</strong> We may
              process your information if you choose to use any of our offerings
              that allow for communication with another user.
            </li>
          </ul>
          <ul
            id="953ff918-6a18-4065-9a17-f994e572cef3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>
                To save or protect an individual&#x27;s vital interest.
              </strong>
              We may process your information when necessary to save or protect
              an individual&#x27;s vital interest, such as to prevent harm.
            </li>
          </ul>
          <p id="5f3b5a5c-66d9-4878-ac35-5d91d4914313" className=""></p>
          <h2 id="4bdbfb01-4189-4d13-90d0-be0144d2c019" className="">
            3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
          </h2>
          <p id="4dd74083-251a-409f-aac4-0651dad668ae" className="">
            <strong>In Short: </strong>We only process your personal information
            when we believe it is necessary and we have a valid legal reason
            (i.e. legal basis) to do so under applicable law, like with your
            consent, to comply with laws, to provide you with services to enter
            into or fulfil our contractual obligations, to protect your rights,
            or to fulfil our legitimate business interests.
          </p>
          <p id="aed1de14-02ad-44e2-943b-4e3dc4a8c78b" className="">
            <em>
              <span style={{ borderBottom: '0.05em solid' }}>
                If you are located in the EU or UK, this section applies to you.
              </span>
            </em>
          </p>
          <p id="17d0106d-bdca-434e-9a08-f9c897dd1a27" className="">
            The General Data Protection Regulation (GDPR) and UK GDPR require us
            to explain the valid legal bases we rely on in order to process your
            personal information. As such, we may rely on the following legal
            bases to process your personal information:
          </p>
          <ul
            id="1cd84d75-6911-409e-9090-53e030cca1b2"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>Consent</strong>. We may process your information if you
              have given us permission (i.e. consent) to use your personal
              information for a specific purpose. You can withdraw your consent
              at any time.
            </li>
          </ul>
          <ul
            id="4d362ddc-db09-4b41-9a27-d23badfa0c68"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>Performance of a Contract.</strong> We may process your
              personal information when we believe it is necessary to fulfill
              our contractual obligations to you, including providing our
              Services or at your request prior to entering into a contract with
              you.
            </li>
          </ul>
          <ul
            id="32725ef5-f0b0-4e61-83c0-cf519c8e5a7c"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>Legal Obligations.</strong> We may process your
              information where we believe it is necessary for compliance with
              our legal obligations, such as to cooperate with a law enforcement
              body or regulatory agency, exercise or defend our legal rights, or
              disclose your information as evidence in litigation in which we
              are involved.
            </li>
          </ul>
          <ul
            id="9ee05054-20e2-45b8-bff6-42743e3a50c1"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>Vital Interests.</strong> We may process your information
              where we believe it is necessary to protect your vital interests
              or the vital interests of a third party, such as situations
              involving potential threats to the safety of any person.
            </li>
          </ul>
          <p id="869dd2ae-04ba-4fd3-b272-c4548f64b6fa" className=""></p>
          <p id="96b02671-41d8-4932-841e-2357852f2340" className="">
            <em>
              <span style={{ borderBottom: '0.05em solid' }}>
                If you are located in Canada, this section applies to you.
              </span>
            </em>
          </p>
          <p id="914a5a14-d29b-4e61-972c-94b3d807f314" className="">
            We may process your information if you have given us specific
            permission (i.e. express consent) to use your personal information
            for a specific purpose, or in situations where your permission can
            be inferred (i.e. implied consent). You can withdraw your consent at
            any time.
          </p>
          <p id="e1919a41-976d-4d22-9e12-1d8d1810dd99" className="">
            In some exceptional cases, we may be legally permitted under
            applicable law to process your information without your consent,
            including, for example:
          </p>
          <ul
            id="dca2427b-b5e0-446b-acd6-4c0a6ea14c60"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              If collection is clearly in the interests of an individual and
              consent cannot be obtained in a timely way
            </li>
          </ul>
          <ul
            id="608dead6-c59c-4d54-b8dd-ec11323c84aa"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              For investigations and fraud detection and prevention
            </li>
          </ul>
          <ul
            id="eb093711-8800-4581-9ba7-de69f9b8e846"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              For business transactions provided certain conditions are met If
              it is contained in a witness statement and the collection is
              necessary to assess, process, or settle an insurance claim
            </li>
          </ul>
          <ul
            id="d8ed9567-7c97-40a1-a6e8-ceaed534c497"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              For identifying injured, ill, or deceased persons and
              communicating with next of kin
            </li>
          </ul>
          <ul
            id="e440be94-c0b4-4372-97c9-a501adfe716c"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              If we have reasonable grounds to believe an individual has been,
              is, or may be victim of financial abuse
            </li>
          </ul>
          <ul
            id="5704c31f-dc8f-41cb-83c9-e4ae657e4dc5"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              If it is reasonable to expect collection and use with consent
              would compromise the availability or the accuracy of the
              information and the collection is reasonable for purposes related
              to investigating a breach of an agreement or a contravention of
              the laws of Canada or a province
            </li>
          </ul>
          <ul
            id="bf5f06cb-5976-4b0c-8e71-6cba9482b7c2"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              If disclosure is required to comply with a subpoena, warrant,
              court order, or rules of the court relating to the production of
              records
            </li>
          </ul>
          <ul
            id="323976dd-d268-46b3-9eda-eb96459af7c9"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              If it was produced by an individual in the course of their
              employment, business, or profession and the collection is
              consistent with the purposes for which the information was
              produced
            </li>
          </ul>
          <ul
            id="416bc27c-6df4-42a4-8c3c-4443587cdea7"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              If the collection is solely for journalistic, artistic, or
              literary purposes If the information is publicly available and is
              specified by the regulations
            </li>
          </ul>
          <p id="165c39e2-3012-48de-a111-03c22232d5ac" className=""></p>
          <h2 id="f2b76c6b-fb3a-4f04-9c6a-6d54da037986" className="">
            4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h2>
          <p id="2588a758-2a2d-4f26-ba9d-266d707fd882" className="">
            <strong>In Short:</strong> We may share information in specific
            situations described in this section and/or with the following third
            parties.
          </p>
          <p id="99fc6da1-ed09-4072-8fd8-6aaadc79e2db" className="">
            We may need to share your personal information in the following
            situations:
          </p>
          <ul
            id="9ca19ce5-f82d-4d46-a5fc-e4f5a4c880ec"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>Business Transfers</strong>. We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </li>
          </ul>
          <ul
            id="e9e34e4d-8210-44df-ab3c-db67e69c557c"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>Business Partners. </strong>We may share your information
              with our business partners to offer you certain products,
              services, or promotions.
            </li>
          </ul>
          <ul
            id="111e07bf-18c7-4cf7-8717-0e9676df1ad2"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              <strong>Other Users.</strong> When you share personal information
              (for example, by posting comments, contributions, or other content
              to the Services) or otherwise interact with public areas of the
              Services, such personal information may be viewed by all users and
              may be publicly made available outside the Services in perpetuity.
              Similarly, other users will be able to view descriptions of your
              activity, communicate with you within our Services, and view your
              profile.
            </li>
          </ul>
          <p id="8d62871a-6769-4aed-9642-e3997a25174a" className=""></p>
          <h2 id="58ff4bc4-c6a0-4ba2-bb63-5a443502713a" className="">
            5. HOW LONG DO WE KEEP YOUR INFORMATION?
          </h2>
          <p id="67027c45-04bf-4d4d-be0c-803680d9fa30" className="">
            <strong>In Short:</strong> We keep your information for as long as
            necessary to fulfill the purposes outlined in this privacy notice
            unless otherwise required by law.
          </p>
          <p id="e5ed503d-80a5-42eb-b2c4-ff7e14c278e9" className="">
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than three (3) months past the termination of the user&#x27;s
            account.
          </p>
          <p id="603f882a-d3ea-40f4-a1cc-89550677aa02" className="">
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymise such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </p>
          <p id="b340f8c8-097a-4f95-a26f-bcd11f4832d9" className=""></p>
          <h2 id="bd05b987-0706-4aa7-88a2-2d8415a5921b" className="">
            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </h2>
          <p id="3d94dfa0-e4ed-45cc-9374-d27d43f43f19" className="">
            <strong>In Short: </strong>We aim to protect your personal
            information through a system of organizational and technical
            security measures.
          </p>
          <p id="71803816-5ff4-4419-adaf-026b29440f04" className="">
            We have implemented appropriate and reasonable technical and
            organizational security measures designed to protect the security of
            any personal information we process. However, despite our safeguards
            and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be
            guaranteed to be 100% secure, so we cannot promise or guarantee that
            hackers, cybercriminals, or other unauthorized third parties will
            not be able to defeat our security and improperly collect, access,
            steal, or modify your information. Although we will do our best to
            protect your personal information, transmission of personal
            information to and from our Services is at your own risk. You should
            only access the Services within a secure environment.
          </p>
          <p id="27992aa2-c541-4414-80c5-9e30b54a7c67" className=""></p>
          <h2 id="bde7f828-205a-4fe3-92b2-92984e8e9851" className="">
            7. WHAT ARE YOUR PRIVACY RIGHTS?
          </h2>
          <p id="628db351-f405-4cd4-8897-8260b2bfb6fc" className="">
            <strong>In Short:</strong> In some regions, such as the European
            Economic Area (EEA), United Kingdom (UK), and Canada, you have
            rights that allow you greater access to and control over your
            personal information. You may review, change, or terminate your
            account at any time.
          </p>
          <p id="79dce858-9568-4d01-b411-3e999acf357d" className="">
            In some regions (like the EEA, UK, and Canada), you have certain
            rights under applicable data protection laws. These may include the
            right (i) to request access and obtain a copy of your personal
            information, (li) to request rectification or erasure; (ill) to
            restrict the processing of your personal information; and (iv) if
            applicable, to data portability. In certain circumstances, you may
            also have the right to object to the processing of your personal
            information. You can make such a request by contacting us by using
            the contact details provided in the section &#x27;HOW CAN YOU
            CONTACT US ABOUT THIS NOTICE?&#x27; below.
          </p>
          <p id="a6933ab8-ed31-43aa-ad09-c3bb3ac847b1" className="">
            We will consider and act upon any request in accordance with
            applicable data protection laws.
          </p>
          <p id="6dd41433-6d7a-4bba-9b4e-e580200e4e5c" className="">
            If you are located in the EA or UK and you believe we are unlawfully
            processing your personal information, you also have the right to
            complain to your local data protection supervisory authority. You
            can find their contact details here:
            <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
              https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
            </a>
            .
          </p>
          <p id="c6de9f1b-a1b2-458d-953a-f16fa88335ae" className="">
            If you are located in Switzerland, the contact details for the data
            protection authorities are available here:
            <a href="https://www.edoeb.admin.ch/edoeb/en/home.html">
              https://www.edoeb.admin.ch/edoeb/en/home.html
            </a>
            .
          </p>
          <p id="60462df5-3549-4bce-b2c8-b58216506a0b" className="">
            <span style={{ borderBottom: '0.05em solid' }}>
              <strong>Withdrawing your consent:</strong>
            </span>
            If we are relying on your consent to process your personal
            information, which may be express and/or implied consent depending
            on the applicable law, you have the right to withdraw your consent
            at any time. You can withdraw your consent at any time by contacting
            us by using the contact details provided in the section &#x27;HOW
            CAN YOU CONTACT US ABOUT THIS NOTICE?&#x27; below or updating your
            preferences.
          </p>
          <p id="6d880076-75f9-42ee-88d0-f6a8d03b9a1c" className="">
            However, please note that this will not affect the lawfulness of the
            processing before its withdrawal nor, when applicable law allows,
            will it affect the processing of your personal information conducted
            in reliance on lawful processing grounds other than consent.
          </p>
          <p id="c754820b-7d05-48c2-bffb-451374e3843b" className="">
            <strong>
              <span style={{ borderBottom: '0.05em solid' }}>
                Opting out of marketing and promotional communications:
              </span>
            </strong>
            You can unsubscribe from our marketing and promotional
            communications at any time by clicking on the unsubscribe link in
            the emails that we send, or by contacting us using the details
            provided in the section &#x27;HOW CAN YOU CONTACT US ABOUT THIS
            NOTICE?&#x27; below. You will then be removed from the marketing
            lists.
          </p>
          <p id="21ceb925-66f2-4378-a319-7a24bddb309f" className="">
            However, we may still communicate with you - for example, to send
            you service-related messages that are necessary for the
            administration and use of your account, to respond to service
            requests, or for other non-marketing purposes.
          </p>
          <p id="e6e4cccb-04e7-41a1-8a28-626dabe03f94" className="">
            <strong>Account Information </strong>If you would at any time like
            to review or change the information in your account or terminate
            your account, you can:
          </p>
          <ul
            id="f5528b0f-ad45-4539-800b-19da7a9f55fe"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Log in to your account settings and update your user account.
            </li>
          </ul>
          <p id="41c60849-4f7e-400b-9fa0-66c04d6e9420" className="">
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal
            requirements.
          </p>
          <p id="ac71aa7d-ce0c-4d76-bbd9-b1a2f2b7bc81" className="">
            If you have questions or comments about your privacy rights, you may
            email us at privacy@mazury.xyz.
          </p>
          <p id="cd5da0e8-2af9-4dd4-b60d-a1e9758721f4" className=""></p>
          <h2 id="d9b539fd-7113-48ce-a3ec-886d945be1f7" className="">
            8. CONTROLS FOR DO-NOT-TRACK FEATURES
          </h2>
          <p id="bb847278-9ffe-4a3a-a00e-afcdf8c55b25" className="">
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (&#x27;DNT&#x27;) feature or
            setting you can activate to signal your privacy preference not to
            have data about your online browsing activities monitored and
            collected. At this stage no uniform technology standard for
            recognising and implementing DNT signals has been finalised. As
            such, we do not currently respond to DNT browser signals or any
            other mechanism that automatically communicates your choice not to
            be tracked online. If a standard for online tracking is adopted that
            we must follow in the future, we will inform you about that practice
            in a revised version of this privacy notice.
          </p>
          <h2 id="0ea63633-a213-460d-b136-ef1d7b1613e4" className="">
            9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </h2>
          <p id="6bf2e74c-6803-459b-96ea-0836aca6345a" className="">
            <strong>In Short: </strong>Yes, if you are a resident of California,
            you are granted specific rights regarding access to your personal
            information.
          </p>
          <p id="cef553ad-e98e-4539-b765-bf9b745da70c" className="">
            California Civil Code Section 1798.83, also known as the &#x27;Shine
            The Light&#x27; law, permits our users who are California residents
            to request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the
            names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact
            information provided below.
          </p>
          <p id="07530361-a7dc-49a1-a4a2-2e06efa47ea6" className="">
            If you are under 18 years of age, reside in California, and have a
            registered account with Services, you have the right to request
            removal of unwanted data that you publicly post on the Services. To
            request removal of such data, please contact us using the contact
            information provided below and include the email address associated
            with your account and a statement that you reside in California. We
            will make sure the data is not publicly displayed on the Services,
            but please be aware that the data may not be completely or
            comprehensively removed from all our systems (e.g. backups, etc.).
          </p>
          <p id="1df3c880-ad17-4a27-ace2-15d8c2c54961" className=""></p>
          <p id="0d8bba1a-83d0-4a0b-99a8-04b24d0de539" className="">
            <strong>CPA Privacy Notice</strong>
          </p>
          <p id="ad62515e-f43e-4359-bbd9-e943d959d18c" className="">
            The California Code of Regulations defines a &#x27;resident&#x27;
            as:
          </p>
          <ol
            type="1"
            id="4e0df471-127e-4ed9-bfcf-febea5b18ccb"
            className="numbered-list"
            start={1}
          >
            <li>
              every individual who is in the State of California for other than
              a temporary or transitory purpose and
            </li>
          </ol>
          <ol
            type="1"
            id="ef9e582f-e4e4-4fe0-95c6-b211c85cee07"
            className="numbered-list"
            start={2}
          >
            <li>
              every individual who is domiciled in the State of California who
              is outside the State of California for a temporary or transitory
              purpose
            </li>
          </ol>
          <p id="edc73f3c-582f-4f5d-8ce1-77ca45c327f5" className="">
            All other individuals are defined as &#x27;non-residents&#x27;.
          </p>
          <p id="199c5c68-a7ad-4b23-bdde-c6e7fe37b20c" className="">
            If this definition of &#x27;resident&#x27; applies to you, we must
            adhere to certain rights and obligations regarding your personal
            information.
          </p>
          <p id="ce3db400-a1a1-43bf-a263-787e1167f692" className="">
            <strong>
              What categories of personal information do we collect?
            </strong>
          </p>
          <p id="c2dbea12-c85b-407a-89be-65149c30a1a9" className="">
            We have collected the following categories of personal information
            in the past twelve (12) months:
          </p>
          <p id="a519db14-c749-4d40-b681-8e922a66ef24" className="">
            We may also collect other personal information outside of these
            categories through instances where you interact with us in person,
            online, or by phone or mail in the context of
          </p>
          <ul
            id="3a5e982a-fc0f-4de8-80a7-61ce2e31f21b"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Receiving help through our customer support channels;
            </li>
          </ul>
          <ul
            id="832dc02b-495d-4d27-a6a4-fda23560f7ea"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              Participation in customer surveys or contests; and Facilitation in
              the delivery of our Services and to respond to your inquiries.
            </li>
          </ul>
          <p id="7e16ed7e-f801-42a2-9b66-d223625bbbb2" className="">
            <strong>How do we use and share your personal information?</strong>
          </p>
          <p id="f7491de0-2ab3-41cc-bea0-4413df2097ca" className="">
            More information about our data collection and sharing practices can
            be found in this privacy notice.
          </p>
          <p id="41472cc0-5bbc-4163-b99d-0d071d2a9bc1" className="">
            You may contact us by email at support@mazury.xyz, or by referring
            to the contact details at the bottom of this document.
          </p>
          <p id="560e3458-351c-4a56-a760-a9c341dba399" className="">
            If you are using an authorised agent to exercise your right to opt
            out we may deny a request if the authorised agent does not submit
            proof that they have been validly authorised to act on your behalf.
          </p>
          <p id="187418eb-e964-4c62-8bba-c9a397eb2924" className="">
            <strong>Will your information be shared with anyone else?</strong>
          </p>
          <p id="d588baf5-bd2f-47cd-bbbf-0aeaf8fc84f1" className="">
            We may disclose your personal information with our service providers
            pursuant to a written contract between us and each service provider.
            Each service provider is a for-profit entity that processes the
            information on our behalf.
          </p>
          <p id="809e46b8-a334-4ee2-829c-a0eeacbfc566" className="">
            We may use your personal information for our own business purposes,
            such as for undertaking internal research for technological
            development and demonstration. This is not considered to be
          </p>
          <p id="0ba18e1e-f4bb-4f8d-9773-c7a4b7f1d90a" className="">
            &#x27;selling&#x27; of your personal information.
          </p>
          <p id="ec9f57e6-4800-4a1b-95a0-bde1f3d1e256" className="">
            Mazury Labs SAS has not disclosed or sold any personal information
            to third parties for a business or commercial purpose in the
            preceding twelve (12) months. Mazury Labs SAS will not sell personal
            information in the future belonging to website visitors, users, and
            other consumers.
          </p>
          <p id="3bde1e00-4219-439c-bc86-db8b9f9ca73d" className=""></p>
          <p id="17d37c0a-f5b8-48b9-b37a-b117d69bc88d" className="">
            <strong>Your rights with respect to your personal data</strong>
          </p>
          <p id="ce76a04f-0ab9-45e3-ba78-0dc889e683f0" className="">
            <span style={{ borderBottom: '0.05em solid' }}>
              Right to request deletion of the data - Request to delete
            </span>
          </p>
          <p id="40d5ba51-04d3-472d-b053-af342022b50f" className="">
            You can ask for the deletion of your personal information. If you
            ask us to delete your personal information, we will respect your
            request and delete your personal information, subject to certain
            exceptions provided by law, such as (but not limited to) the
            exercise by another consumer of his or her right to free speech, our
            compliance requirements resulting from a legal obligation, or any
            processing that may be required to protect against illegal
            activities.
          </p>
          <p id="2639f075-5834-49e9-a717-b172ec94e12e" className="">
            <span style={{ borderBottom: '0.05em solid' }}>
              Right to be informed - Request to know
            </span>
          </p>
          <p id="4de25c59-a98a-4c6a-9265-6ac0b35b9f74" className="">
            Depending on the circumstances, you have a right to know:
          </p>
          <ul
            id="9e25d7df-50ea-48f9-93a5-35be10a0a030"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              whether we collect and use your personal information;
            </li>
          </ul>
          <ul
            id="23e4ca63-5a20-4742-bb08-54d724493b93"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              the categories of personal information that we collect;
            </li>
          </ul>
          <ul
            id="47af5b06-cfc4-43ee-bd49-16f17d296259"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              the purposes for which the collected personal information is used;
              whether we sell your personal information to third parties;
            </li>
          </ul>
          <ul
            id="61a4736f-914d-4736-8536-15373afad0b3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              the categories of personal information that we sold or disclosed
              for a business purpose;
            </li>
          </ul>
          <ul
            id="7f25ea6e-dae5-4ab4-966d-c66f19f06ded"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              the categories of third parties to whom the personal information
              was sold or disclosed for a business purpose; and the business or
              commercial purpose for collecting or selling personal information.
            </li>
          </ul>
          <p id="37dbb34e-7088-470e-8065-e8326f6af610" className="">
            In accordance with applicable law, we are not obligated to provide
            or delete consumer information that is de-identified in response to
            a consumer request or to re-identify individual data to verify a
            consumer request.
          </p>
          <p id="409e769a-45cb-4d10-96c8-ebd2851771ac" className="">
            <span style={{ borderBottom: '0.05em solid' }}>
              Right to Non-Discrimination for the Exercise of a Consumer&#x27;s
              Privacy Rights
            </span>
          </p>
          <p id="d75f0a98-9994-4fd3-a76c-345e98e6564d" className="">
            We will not discriminate against you if you exercise your privacy
            rights.
          </p>
          <p id="71e4d585-bba3-4b09-99a0-aadace9c91dd" className="">
            <span style={{ borderBottom: '0.05em solid' }}>
              Verification process
            </span>
          </p>
          <p id="3c7f23a5-edc4-4a96-bd18-6774902c71b0" className="">
            Upon receiving your request, we will need to verify your identity to
            determine you are the same person about whom we have the information
            in our system. These verification efforts require us to ask you to
            provide information so that we can match it with information you
            have previously provided us. For instance, depending on the type of
            request you submit, we may ask you to provide certain information so
            that we can match the information you provide with the information
            we already have on file, or we may contact you through a
            communication method (e.g. phone or email) that you have previously
            provided to us. We may also use other verification methods as the
            circumstances dictate.
          </p>
          <p id="185a2194-2962-4c3c-95b8-361c6ad43fbe" className="">
            We will only use personal information provided in your request to
            verify your identity or authority to make the request. To the extent
            possible, we will avoid requesting additional information from you
            for the purposes of verification. However, if we cannot verify your
            identity from the information already maintained by us, we may
            request that you provide additional information for the purposes of
            verifying your identity and for security or fraud-prevention
            purposes. We will delete such additionally provided information as
            soon as we finish verifying you.
          </p>
          <p id="624c019e-9998-444d-8a72-3dbdbd765d02" className="">
            <span style={{ borderBottom: '0.05em solid' }}>
              Other privacy rights
            </span>
          </p>
          <ul
            id="d0d98e12-2a92-44b5-ab74-0427e3e71aa3"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              You may object to the processing of your personal information.
            </li>
          </ul>
          <ul
            id="bc54120d-feae-4c8f-87ce-28f19da994e6"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              You may request correction of your personal data if it is
              incorrect or no longer relevant, or ask to restrict the processing
              of the information.
            </li>
          </ul>
          <ul
            id="a33a4954-8778-4b4e-839c-e5c5eb51751c"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              You can designate an authorised agent to make a request under the
              CPA on your behalf. We may deny a request from an authorised agent
              that does not submit proof that they have been validly authorised
              to act on your behalf in accordance with the CPA.
            </li>
          </ul>
          <ul
            id="f98b9c97-1c26-42a4-9c7c-026797c6800e"
            className="bulleted-list"
          >
            <li style={{ listStyleType: 'disc' }}>
              You may request to opt out from future selling of your personal
              information to third parties. Upon receiving an opt-out request,
              we will act upon the request as soon as feasibly possible, but no
              later than fifteen (15) days from the date of the request
              submission.
            </li>
          </ul>
          <p id="489696a3-9ee9-45b9-9d3f-54f450731860" className=""></p>
          <p id="3a330233-fd03-4510-ad0a-1ea89aa3f531" className="">
            To exercise these rights, you can contact us by email at
            support@mazury.xyz, or by referring to the contact details at the
            bottom of this document. If you have a complaint about how we handle
            your data, we would like to hear from you.
          </p>
          <p id="8b4d88f8-9ffa-44f4-aaa9-45e1810f2e09" className=""></p>
          <h2 id="738427aa-edd7-4ba8-8022-bfbf5d55a6a4" className="">
            10. DO WE MAKE UPDATES TO THIS NOTICE?
          </h2>
          <p id="40ada4ea-4d2b-4c4e-acb4-7c1a82d2f387" className="">
            <strong>In Short: </strong>Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
          </p>
          <p id="9655b408-dc99-4bb4-9670-c2bdeb64f8d7" className="">
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated &#x27;Revised&#x27; date and
            the updated version will be effective as soon as it is accessible.
            If we make material changes to this privacy notice, we may notify
            you either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </p>
          <p id="e637b941-1b2a-4f56-9ce5-4e0aef1adcee" className=""></p>
          <h2 id="7f95bb7b-f60b-4690-acc3-3193c692d5a9" className="">
            11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </h2>
          <p id="41f201bf-b0d6-478c-af14-9ba93af08498" className="">
            If you have questions or comments about this notice, you may email
            us at support@mazury.xyz or by post to: Mazury Labs SAS 3 RUE JULES
            GUESDE RIS ORANGIS, Paris 91130 France
          </p>
          <p id="aed1167d-b51d-4cab-8351-e87013efef42" className=""></p>
          <h2 id="215d8379-ca67-4dde-b1f4-144fd4f64ac8" className="">
            12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </h2>
          <p id="e774e438-2ae9-4d57-8cfd-157300b66b9b" className="">
            You have the right to request access to the personal information we
            collect from you, change that information, or delete it. To request
            to review, update, or delete your personal information, please
            contact privacy@mazury.xyz
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
