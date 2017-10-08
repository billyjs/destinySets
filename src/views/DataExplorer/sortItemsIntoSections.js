import { uniqBy, groupBy } from 'lodash';

const WEAPON = 1;
const ARMOR = 20;

const TITAN = 0;
const HUNTER = 1;
const WARLOCK = 2;

export default function sortItems(_items, verbose = false) {
  const items = uniqBy(_items, item => item.hash);

  const sectionItems = groupBy(items, item => {
    if (item.itemCategoryHashes.includes(WEAPON)) {
      return 'weapon';
    } else if (item.itemCategoryHashes.includes(ARMOR)) {
      return item.classType;
    } else {
      return 'other';
    }
  });

  const sections = [
    { title: 'Weapons', items: sectionItems.weapon },
    { title: 'Hunter armor', items: sectionItems[HUNTER] },
    { title: 'Titan armor', items: sectionItems[TITAN] },
    { title: 'Warlock armor', items: sectionItems[WARLOCK] },
    { title: 'Other', items: sectionItems.other },
  ]
    .filter(({ items }) => {
      return items && items.length > 0;
    })
    .map(section => {
      if (verbose) {
        return section;
      }

      const items = section.items.map(item => item.hash);
      return {
        title: section.title,
        items,
      };
    });

  return sections;
}
