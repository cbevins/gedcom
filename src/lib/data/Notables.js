/**
 * Data store for notable comments about persons or events
 * tree : must be 'BH' or 'RT'
 * EITHER 'keys:[] OR title must be specified
 * keys: [] is an array of person keys
 * pars: [] is an array of paragraphs
 */

export const Notables = [
    {
        tree: 'BH', keys: [], title: 'Farmers, Farmers, and More Farmers',
        pars: ['The Bevins-Heddens were overwhemingly farmers and house keepers, with very few trades persons or professionals.'
            + ' Any direct ancestors that were not farmers or housekeepers are noted in this section.']
    },{
        tree: 'BH', keys: [], title: 'Children, Children, and More Children',
        pars: ['Large family sizes were the norm, with many women giving birth to over 10 children.']
    },{
        tree: 'BH', keys: ["ChristianB.Goble1754"], title: 'Revolutionary War Soldier',
        pars: ['According to DAR, Christian served as a private in the Frederick County, Maryland Militia, '
        + 'Flying Camp outfit under Capt. Jacob Goode & Col. Griffin.']
    },{
        tree: 'BH', keys: ['JamesPolkHarris(2)1752'], title: 'Revolutionary War Soldier',
        pars: ['James volunteered in the Buckingham County, Virgian malitia on Sep 2, 1777'
        + ' and completed his 9 month contract without action.  He was subsequently drafted'
        + ' for an additional 3 months during which time he again saw no action.'
        + ' On Feb 6, 1781, he again volunteered as a private in the State of Virginia'
        + ' to go against Gen Benedict Arnold, and saw action at Portsmouth.'
        + ' They then marched to James River, near Richmond, and then to Petersburg where'
        + ' the Americans were defeated attempting to keep the British out of the town'
        + ' (25 Apr 1781)',
        'He was then commanded by Gen Lafayette and saw some action against Tarleton,'
        + ' until July when they were all discharged to return home for harvest.'
        + ' But he was immediately re-drafted on 24 July 1781, again under Layfayette,'
        + ' and saw action at the seige of Little York (28 Sep - 19 Oct 1781).'
        + ' He received his discharge a few days after Gen Cornwallis surrendered.',
        'James was personally acquainted with Gens Steuben and Layfayette, and saw'
        + ' Gen George Washington at Little York.',
        'At age 82, he and his wife Patte began receiving a pension of $70 per year']
    }
]