import type { ResolvedConfig, Plugin, ChunkMetadata } from 'vite'

declare module 'rollup' {
  export interface RenderedChunk {
    viteMetadata: ChunkMetadata
  }
}

export type Icon = string
export type MatchPattern = string
/**
 * This introduces some fairly strict policies that will make extensions more secure by default, and provides you with the ability to create and enforce rules governing the types of content that can be loaded and executed by your extensions and applications.
 */
export type ContentSecurityPolicy = string

export interface ChromeExtensionManifest {
  /**
   * Use the chrome.action API to control the extension's icon in the Google Chrome toolbar.
   */
  action?: {
    default_icon?:
    | {
      '16'?: string
      '24'?: string
      '32'?: string
    }
    | string
    | undefined
    default_title?: string
    default_popup?: string
  }
  side_panel?: {
    default_path: string
  }
  background?: Background
  chrome_settings_overrides?: ChromeSettingsOverrides
  /**
   * Override pages are a way to substitute an HTML file from your extension for a page that Google Chrome normally provides.
   */
  chrome_url_overrides?: {
    /**
     * The page that appears when the user chooses the Bookmark Manager menu item from the Chrome menu or, on Mac, the Bookmark Manager item from the Bookmarks menu. You can also get to this page by entering the URL chrome://bookmarks.
     */
    bookmarks?: string
    /**
     * The page that appears when the user chooses the History menu item from the Chrome menu or, on Mac, the Show Full History item from the History menu. You can also get to this page by entering the URL chrome://history.
     */
    history?: string
    /**
     * The page that appears when the user creates a new tab or window. You can also get to this page by entering the URL chrome://newtab.
     */
    newtab?: string
  }
  /**
   * Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.
   */
  commands?: {
    [k: string]: unknown
  }
  /**
   * Content scripts are JavaScript files that run in the context of web pages.
   */
  content_scripts?: ContentScript[]
  content_security_policy?: ContentSecurityPolicy
  current_locale?: unknown
  /**
   * Specifies the subdirectory of _locales that contains the default strings for this extension.
   */
  default_locale?: string
  /**
   * A plain text description of the extension
   */
  description?: string
  /**
   * A DevTools extension adds functionality to the Chrome DevTools. It can add new UI panels and sidebars, interact with the inspected page, get information about network requests, and more.
   */
  devtools_page?: string
  /**
   * Declares which extensions, apps, and web pages can connect to your extension via runtime.connect and runtime.sendMessage.
   */
  externally_connectable?: {
    ids?: string[]
    matches?: string[]
    /**
     * Indicates that the extension would like to make use of the TLS channel ID of the web page connecting to it. The web page must also opt to send the TLS channel ID to the extension via setting includeTlsChannelId to true in runtime.connect's connectInfo or runtime.sendMessage's options.
     */
    accepts_tls_channel_id?: boolean
  }
  /**
   * You can use this API to enable users to upload files to your website.
   */
  file_browser_handlers?: [
    {
      /**
       * Used by event handling code to differentiate between multiple file handlers
       */
      id: string
      /**
       * What the button will display.
       */
      default_title: string
      /**
       * Filetypes to match.
       */
      file_filters: [string, ...string[]]
    },
    ...{
      /**
       * Used by event handling code to differentiate between multiple file handlers
       */
      id: string
      /**
       * What the button will display.
       */
      default_title: string
      /**
       * Filetypes to match.
       */
      file_filters: [string, ...string[]]
    }[]
  ]
  /**
   * The URL of the homepage for this extension.
   */
  homepage_url?: string
  /**
   * One or more icons that represent the extension, app, or theme. Recommended format: PNG; also BMP, GIF, ICO, JPEG.
   */
  icons?: {
    /**
     * Used as the favicon for an extension's pages and infobar.
     */
    '16'?: string
    /**
     * Used on the extension management page (chrome://extensions).
     */
    '48'?: string
    /**
     * Used during installation and in the Chrome Web Store.
     */
    '128'?: string
    /**
     * Used during installation and in the Chrome Web Store.
     */
    '256'?: string
  }
  import?: {
    id: string
    minimum_version?: string
  }[]
  /**
   * Specify how this extension will behave if allowed to run in incognito mode.
   */
  incognito?: 'spanning' | 'split' | 'not_allowed'
  /**
   * Allows your extension to handle keystrokes, set the composition, and manage the candidate window.
   */
  input_components?: {
    description: string
    id: string
    language: string
    layouts: unknown[]
    name: string
    type: string
  }[]
  /**
   * This value can be used to control the unique ID of an extension, app, or theme when it is loaded during development.
   */
  key?: string
  /**
   * One integer specifying the version of the manifest file format your package requires.
   */
  manifest_version: 3
  /**
   * The version of Chrome that your extension, app, or theme requires, if any.
   */
  minimum_chrome_version?: string
  /**
   * One or more mappings from MIME types to the Native Client module that handles each type.
   */
  nacl_modules?: [
    {
      /**
       * The location of a Native Client manifest (a .nmf file) within the extension directory.
       */
      path: string
      /**
       * The MIME type for which the Native Client module will be registered as content handler.
       */
      mime_type: string
    },
    ...{
      /**
       * The location of a Native Client manifest (a .nmf file) within the extension directory.
       */
      path: string
      /**
       * The MIME type for which the Native Client module will be registered as content handler.
       */
      mime_type: string
    }[]
  ]
  /**
   * The name of the extension
   */
  name: string
  /**
   * Use the Chrome Identity API to authenticate users: the getAuthToken for users logged into their Google Account and the launchWebAuthFlow for users logged into a non-Google account.
   */
  oauth2?: {
    /**
     * You need to register your app in the Google APIs Console to get the client ID.
     */
    client_id: string
    scopes: [string, ...string[]]
  }
  /**
   * Whether the app or extension is expected to work offline. When Chrome detects that it is offline, apps with this field set to true will be highlighted on the New Tab page.
   */
  offline_enabled?: boolean
  /**
   * The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.
   */
  omnibox?: {
    /**
     * The keyward that will trigger your extension.
     */
    keyword: string
  }
  /**
   * Use the chrome.permissions API to request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.
   */
  optional_permissions?: string[]
  /**
   * To allow users to customize the behavior of your extension, you may wish to provide an options page. If you do, a link to it will be provided from the extensions management page at chrome://extensions. Clicking the Options link opens a new tab pointing at your options page.
   */
  options_page?: string
  /**
   * To allow users to customize the behavior of your extension, you may wish to provide an options page. If you do, an Options link will be shown on the extensions management page at chrome://extensions which opens a dialogue containing your options page.
   */
  options_ui?: {
    /**
     * If true, your extension's options page will be opened in a new tab rather than embedded in chrome://extensions. The default is false, and we recommend that you don't change it. This is only useful to delay the inevitable deprecation of the old options UI! It will be removed soon, so try not to use it. It will break.
     */
    open_in_tab?: boolean
    /**
     * The path to your options page, relative to your extension's root.
     */
    page: string
    [k: string]: unknown
  }
  /**
   * Permissions help to limit damage if your extension or app is compromised by malware. Some permissions are also displayed to users before installation, as detailed in Permission Warnings.
   */
  permissions?: string[]
  host_permissions?: string[]
  platforms?: unknown
  /**
   * Technologies required by the app or extension. Hosting sites such as the Chrome Web Store may use this list to dissuade users from installing apps or extensions that will not work on their computer.
   */
  requirements?: {
    /**
     * The '3D' requirement denotes GPU hardware acceleration.
     */
    '3D'?: {
      /**
       * List of the 3D-related features your app requires.
       */
      features: ['webgl', ...'webgl'[]]
    }
    /**
     * Indicates if an app or extension requires NPAPI to run. This requirement is enabled by default when the manifest includes the 'plugins' field.
     */
    plugins?: {
      npapi: boolean
    }
  }
  /**
   * Defines an collection of app or extension pages that are to be served in a sandboxed unique origin, and optionally a Content Security Policy to use with them.
   */
  sandbox?: {
    pages: string[]
    /**
     * This introduces some fairly strict policies that will make extensions more secure by default, and provides you with the ability to create and enforce rules governing the types of content that can be loaded and executed by your extensions and applications.
     */
    content_security_policy?: string
  }
  /**
   * The short name is typically used where there is insufficient space to display the full name.
   */
  short_name?: string
  storage?: {
    managed_schema?: string
    [k: string]: unknown
  }
  system_indicator?: unknown
  /**
   * Register itself as a speech engine.
   */
  tts_engine?: {
    /**
     * Voices the extension can synthesize.
     */
    voices: [
      {
        /**
         * Identifies the name of the voice and the engine used.
         */
        voice_name: string
        /**
         * Almost always, a voice can synthesize speech in just a single language. When an engine supports more than one language, it can easily register a separate voice for each language.
         */
        lang?: string
        /**
         * Events sent to update the client on the progress of speech synthesis.
         */
        event_types: [
          'start' | 'word' | 'sentence' | 'marker' | 'end' | 'error',
          ...('start' | 'word' | 'sentence' | 'marker' | 'end' | 'error')[]
        ]
      },
      ...{
        /**
         * Identifies the name of the voice and the engine used.
         */
        voice_name: string
        /**
         * Almost always, a voice can synthesize speech in just a single language. When an engine supports more than one language, it can easily register a separate voice for each language.
         */
        lang?: string
        /**
         * Events sent to update the client on the progress of speech synthesis.
         */
        event_types: [
          'start' | 'word' | 'sentence' | 'marker' | 'end' | 'error',
          ...('start' | 'word' | 'sentence' | 'marker' | 'end' | 'error')[]
        ]
      }[]
    ]
  }
  /**
   * If you publish using the Chrome Developer Dashboard, ignore this field. If you host your own extension or app: URL to an update manifest XML file.
   */
  update_url?: string
  /**
   * One to four dot-separated integers identifying the version of this extension.
   */
  version: string
  /**
   * In addition to the version field, which is used for update purposes, version_name can be set to a descriptive version string and will be used for display purposes if present.
   */
  version_name?: string
  /**
   * An array of strings specifying the paths (relative to the package root) of packaged resources that are expected to be usable in the context of a web page.
   */
  web_accessible_resources?: [WebAccessibleResource, ...WebAccessibleResource[]]
}
/**
 * The background page is an HTML page that runs in the extension process. It exists for the lifetime of your extension, and only one instance of it at a time is active.
 */
export interface Background {
  /**
   * Specify the service worker of the background page.
   */
  service_worker: string | undefined
}
export interface ChromeSettingsOverrides {
  homepage?: Icon
  search_provider?: {
    name?: string
    keyword?: string
    search_url: Icon
    favicon_url?: Icon
    suggest_url?: Icon
    instant_url?: Icon
    image_url?: Icon
    search_url_post_params?: string
    suggest_url_post_params?: string
    instant_url_post_params?: string
    image_url_post_params?: string
    alternate_urls?: Icon[]
    prepopulated_id?: number
    encoding?: string
    is_default: boolean
    [k: string]: unknown
  }
  startup_pages?: Icon[]
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^_execute_browser_action$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^_execute_page_action$".
 */
export interface Command {
  description?: string
  suggested_key?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(default|mac|windows|linux|chromeos)$".
     */
    [k: string]: string
  }
}
export interface ContentScript {
  /**
   * Specifies which pages this content script will be injected into.
   */
  matches: [MatchPattern, ...MatchPattern[]]
  /**
   * The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page.
   */
  css?: Icon[]
  /**
   * The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array.
   */
  js?: Icon[]
  /**
   * Whether the script should inject into an about:blank frame where the parent or opener frame matches one of the patterns declared in matches. Defaults to false.
   */
  match_about_blank?: boolean
}
export interface WebAccessibleResource {
  resources: string[]
  matches?: string[]
  extension_ids?: string[]
  use_dynamic_url?: boolean
}

export interface ProcessorOptions {
  manifestPath: string
  viteConfig: ResolvedConfig
}

export interface Processor {
  cache: Map<string, any>
  options: ProcessorOptions
  side_panel: ProcessorOptions
  plugins: Plugin[]
  assetPaths: string[]
  contentScriptChunkModules: string[]
  serviceWorkerAbsolutePath: string | undefined
  srcDir: string
  manifest: Partial<ChromeExtensionManifest>
  getHtmlPaths: () => string[]
  getContentScriptPaths: () => string[]
  clearCacheById: (context, id: string) => void
  loadManifest: (path) => void
  reLoadManifest: (path) => void
  getAssetPaths: () => void
  generateDevScript: (context, port: number, reloadPage: boolean) => void
  transform: (code: string, id: string, context) => void
  generateAsset: (context) => Promise<void>
  generateManifest: (context, bundle, bundleMap) => Promise<void>
}
