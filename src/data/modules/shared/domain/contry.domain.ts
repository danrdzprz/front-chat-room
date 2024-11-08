export interface CountryDomain {
    name: Name
    tld: string[]
    cca2: string
    ccn3: string
    cca3: string
    cioc: string
    independent: boolean
    status: string
    unMember: boolean
    currencies: Currencies
    idd?: Idd
    capital: string[]
    altSpellings: string[]
    region: string
    subregion: string
    languages: Languages
    translations: Translations
    latlng: number[]
    landlocked: boolean
    area: number
    demonyms: Demonyms
    flag: string
    maps: Maps
    population: number
    gini: Gini
    fifa: string
    car: Car
    timezones: string[]
    continents: string[]
    flags: Flags
    coatOfArms: CoatOfArms
    startOfWeek: string
    capitalInfo: CapitalInfo
    postalCode: PostalCode
  }
  
  export interface Name {
    common: string
    official: string
    nativeName: NativeName
  }
  
  export interface NativeName {
    [key:string]: {
        official: string
        common: string
    }
  }
  
  export interface Tur {
    official: string
    common: string
  }
  
  export interface Currencies {
    [key:string]: {
        name: string
        symbol: string
    }
  }
  
  
  export interface Idd {
    root: string
    suffixes: string[]
  }
  
  export interface Languages {
    [key:string]:string
  }
  
  export interface Translations {
    ara: TranslationLang
    bre: TranslationLang
    ces: TranslationLang
    cym: TranslationLang
    deu: TranslationLang
    est: TranslationLang
    fin: TranslationLang
    fra: TranslationLang
    hrv: TranslationLang
    hun: TranslationLang
    ita: TranslationLang
    jpn: TranslationLang
    kor: TranslationLang
    nld: TranslationLang
    per: TranslationLang
    pol: TranslationLang
    por: TranslationLang
    rus: TranslationLang
    slk: TranslationLang
    spa: TranslationLang
    srp: TranslationLang
    swe: TranslationLang
    tur: TranslationLang
    urd: TranslationLang
    zho: TranslationLang
  }
  
  export interface TranslationLang {
    official: string
    common: string
  }
  
  
  export interface Demonyms {
    eng: Eng
    fra: Fra2
  }
  
  export interface Eng {
    f: string
    m: string
  }
  
  export interface Fra2 {
    f: string
    m: string
  }
  
  export interface Maps {
    googleMaps: string
    openStreetMaps: string
  }
  
  export interface Gini {
    [key:string]: number
  }
  
  export interface Car {
    signs: string[]
    side: string
  }
  
  export interface Flags {
    png: string
    svg: string
    alt: string
  }
  
  export interface CoatOfArms {
    png: string
    svg: string
  }
  
  export interface CapitalInfo {
    latlng: number[]
  }
  
  export interface PostalCode {
    format: string
    regex: string
  }
  