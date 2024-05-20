/**
 * Contains canonical place names and crosswalk maps
 */

// Maps GEDCOM 1st level place names (country) to canonical names used in reports
export const Countries = new Map([
    ['allemagne', 'Germany'],
    ['australia', 'Australia'],
    ['belgique', 'Belgium'],
    ['belgium', 'Belgium'],
    ['colonial america', 'USA'],
    ['england', 'England'],
    ['canada', 'Canada'],
    ['france', 'France'],
    ['germany', 'Germany'],
    ['holland', 'Netherlands'],
    ['ireland', 'Ireland'],
    ['nederland', 'Netherlands'],
    ['netherlands', 'Netherlands'],
    ['nl', 'Netherlands'],
    ['norvège', 'Norway'],
    ['norway', 'Norway'],
    ['pays-bas', 'Netherlands'],
    ['scotland', 'Scotland'],
    ['suede', 'Sweden'],
    ['suède', 'Sweden'],
    ['sweden', 'Sweden'],
    ['sverige', 'Sweden'],
    // ['united kingdom', 'United Kingdom'],
    // ['unknown', 'Unknown'],
    // ['?', 'Unknown'],
    ['ulster', 'Ulster'],
    ['united states', 'USA'],
    ['united states of america', 'USA'],
    ['us', 'USA'],
    ['usa', 'USA'],
    ['wales', 'Wales'],
])

// Maps various GEDCOM 2nd level state forms to their canonical name
export const States = new Map([
    ['ariz', 'Arizona'],
    ['arizona', 'Arizona'],
    ['arkansas', 'Arkansas'],
    ['az', 'Arizona'],
    ['ca', 'California'],
    ['cal', 'California'],
    ['california', 'California'],
    ['co', 'Colorado'],
    ['col', 'Colorado'],
    ['colorado', 'Colorado'],
    ['conn', 'Connecticut'],
    ['connecticut', 'Connecticut'],
    ['ct', 'Connecticut'],
    ['fl', 'Florida'],
    ['fla', 'Florida'],
    ['florida', 'Florida'],
    ['il', 'Illinois'],
    ['ill', 'Illinois'],
    ['illinois', 'Illinois'],
    ['ia', 'Iowa'],
    ['iowa', 'Iowa'],
    ['in', 'Indiana'],
    ['indiana', 'Indiana'],
    ['ka', 'Kansas'],
    ['kan', 'Kansas'],
    ['kansas', 'Kansas'],
    ['kentucky', 'Kentucky'],
    ['ky', 'Kentucky'],
    ['maine', 'Maine'],
    ['me', 'Maine'],
    ['ma', 'Massachusetts'],
    ['mass', 'Massachusetts'],
    ['massachusetts', 'Massachusetts'],
    ['maryland', 'Maryland'],
    ['md', 'Maryland'],
    ['mi', 'Michigan'],
    ['mich', 'Michigan'],
    ['michigan', 'Michigan'],
    ['minn', 'Minnesota'],
    ['minnesota', 'Minnesota'],
    ['mn', 'Minnesota'],
    ['mo', 'Missouri'],
    ['missouri', 'Missouri'],
    ['mont', 'Montana'],
    ['montana', 'Montana'],
    ['mt', 'Montana'],
    ['ne', 'Nebraska'],
    ['neb', 'Nebraska'],
    ['nebraska', 'Nebraska'],
    ['nv', 'Nevada'],
    ['nev', 'Nevada'],
    ['nevada', 'Nevada'],
    ['new jersey', 'New Jersey'],
    ['nj', 'New Jersey'],
    ['new york', 'New York'],
    ['ny', 'New York'],
    ['nc', 'North Carolina'],
    ['north carolina', 'North Carolina'],
    ['nd', 'North Dakota'],
    ['north dakota', 'North Dakota'],
    ['oh', 'Ohio'],
    ['ohio', 'Ohio'],
    ['oklahoma', 'Oklahoma'],
    ['ore', 'Oregon'],
    ['or', 'Oregon'],
    ['oregon', 'Oregon'],
    ['pa', 'Pensylvannia'],
    ['penn', 'Pensylvannia'],
    ['pennsylvania', 'Pensylvannia'],
    ['rhode island', 'Rhode Island'],
    ['ri', 'Rhode Island'],
    ['tn', 'Tennessee'],
    ['tenn', 'Tennessee'],
    ['tennessee', 'Tennessee'],
    ['tx', 'Texas'],
    ['tex', 'Texas'],
    ['texas', 'Texas'],
    ['wa', 'Washington'],
    ['wash', 'Washington'],
    ['washington', 'Washington'],
    ['wi', 'Wisconsin'],
    ['wisc', 'Wisconsin'],
    ['wisconsin', 'Wisconsin'],
    ['vermont', 'Vermont'],
    ['vt', 'Vermont'],
    ['va', 'Virginia'],
    ['vir', 'Virginia'],
    ['virginia', 'Virginia'],
    ['wv', 'West Virginia'],
    ['west virginia', 'West Virginia'],
])

// Maps various non-US province/county/regional names to their canonical form [<region>, <country>]
export const Regions = new Map([
    ['acadia (nova scotia & new brunswick)', ['Acadia (Nova Scotia & New Brunswick)', 'Canada']],
    ['akershus', ['Akershus', 'Norway']],
    ['alberta', ['Alberta', 'Canada']],
    ['alsace', ['Alsace', 'France']],
    ['ayrshire', ['Ayrshire', 'Scotland']],
    ['baden wurttemberg', ['Baden Wuerttemberg', 'Germany']],
    ['baden-wuerttemberg',['Baden Wuerttemberg', 'Germany']],
    ['bavaria', ['Bavaria', 'Germany']],
    ['bayern', ['Bayern', 'Germany']],
    ['buckinghamshire', ['Buckinghamshire', 'England']],
    ['cambridgeshire', ['Cambridgeshire', 'England']],
    ['canada east (quebec)', ['Québec', 'Canada']],
    ['cheshire', ['Cheshire', 'England']],
    ['cork', ['Cork', 'Ireland']],
    ['cornwall', ['Cornwall', 'England']],
    ['derbyshire', ['Derbyshire', 'England']],
    ['devon', ['Devonshire', 'England']],
    ['devonshire', ['Devonshire', 'England']],
    ['dorset', ['Dorset', 'England']],
    ['drenthe', ['Drenthe', 'Netherlands']],
    ['durham', ['County Durham', 'England']],
    ['durham county', ['County Durham', 'England']],
    ['county durham', ['County Durham', 'England']],
    ['east sussex', ['East Sussex', 'England']],
    ['essex', ['Essex', 'England']],
    ['fife', ['Fife', 'Scotland']],
    ['gelderland', ['Gelderland', 'Netherlands']],
    ['hedmark', ['Hedmark', 'Norway']],
    ['hesse', ['Hesse', 'Norway']],
    ['hessen', ['Hesse', 'Norway']],
    ['kent', ['Kent', 'England']],
    ['kirkcudbrightshire', ['Kirkcudbrightshire', 'Scotland']],
    ['kronoberg', ['Kronoberg', 'Sweden']],
    ['lanark', ['Lanark', 'Scotland']],
    ['lancashire', ['Lancashire', 'Scotland']],
    ['lanarkshire', ['Lanarkshire', 'Scotland']],
    ['leicestershire', ['Leicestershire', 'England']],
    ['leinster', ['Leinster', 'Ireland']],  // One of the 4 provinces of Ireland with Connacht, Munster, and Ulster
    ['linlithgowshire', ['Linlithgowshire', 'Scotland']],
    ['london', ['London', 'England']],
    ['middlesex', ['Middlesex', 'England']],
    ['monaghan', ['Monaghan', 'Ireland']],
    ['munster', ['Munster', 'Ireland']],   // One of the 4 provinces of Ireland with Connacht, Leinster, and Ulster
    ['mijnsheerenland', ['Mijnsheerenland', 'Netherlands']],
    ['nieuw-beijerland', ['Nieuw-Beijerland', 'Netherlands']],
    ['noord-brabant', ['Noord-Brabant', 'Netherlands']],
    ['new brunswick', ['New Brunswick', 'Canada']],
    ['northumberland', ['Northumberland', 'England']],
    ['north holland', ['North Holland', 'Netherlands']],
    ['north rhine-westphalia', ['North Rhine-Westphalia', 'Germany']],
    // ['norway', ['Norway', 'Norway']],   // means somewhere in Norway
    ['nottinghamshire', ['Nottinghamshire', 'England']],
    ['ontario', ['Ontario', 'Canada']],
    ['oppland', ['Oppland', 'Netherlands']],
    ['oost-vlaanderen', ['Oost-Vlaanderen', 'Belguim']],
    ['orebro', ['Orebro', 'Sweden']],
    ['oud beijerland', ['Oud-Beijerland', 'Netherlands']],
    ['oud-beijerland', ['Oud-Beijerland', 'Netherlands']],
    ['qué', ['Québec', 'Canada']],
    ['québec', ['Québec', 'Canada']],
    ['que', ['Québec', 'Canada']],
    ['que.', ['Québec', 'Canada']],
    ['quebec', ['Québec', 'Canada']],
    ['renfrewshire', ['Renfrewshire', 'Scotland']],
    ['rheinland pfalz', ['Rhineland-Palatinate', 'Germany']],
    ['rhineland pfalz', ['Rhineland-Palatinate', 'Germany']],
    ['rhineland-palatinate', ['Rihineland-Palatinate', 'Germany']],
    ['rotterdam', ['Rotterdam', 'Netherlands']],
    ['roxburghshire', ['Roxburghshire', 'Scotland']],
    ['sint anthonie-polder', ['Sint Anthonie-Polder', 'Netherlands']],
    ['sint anthoniepolder', ['Sint Anthonie-Polder', 'Netherlands']],
    ['småland', ['Småland', 'Sweden']],
    ['somerset', ['Somerset', 'England']],
    ['south holland', ['Zuid-Holland', 'Netherlands']],
    ['staffordshire', ['Staffordshire', 'England']],
    ['stirlingshire', ['Stirlingshire', 'Scotland']],
    ['suffolk', ['Suffolk', 'England']],
    ['sulawesi tengah', ['Sulawesi Tengah', 'Indonesia']],
    ['ulster', ['Ulster', 'Northern Ireland']],   // One of the 4 provinces of Ireland with Connacht, Leinster, and Munster
    ['värmland',['Värmland','Sweden']],
    ['warwickshire', ['Warwickshire', 'England']],
    ['western australia', ['Western Australia', 'Australia']],
    ['westmass', ['Westmass', 'Netherlands']],
    ['worcestershire', ['Worcestershire', 'England']],
    ['yorkshire', ['Yorkshire', 'England']],
    ['zh.nld', ['Zuid-Holland', 'Netherlands']],
    ['zuid holland', ['Zuid-Holland', 'Netherlands']],
    ['zuid-holland', ['Zuid-Holland', 'Netherlands']],
])

// Attempts to parse a GEDCOM PLAC field into standard key and parts
export const Recodes = new Map([
    ['united states buried on 12 sep 1792', 'USA' ]
])
