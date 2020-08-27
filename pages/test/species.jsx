import React from 'react'
import SpeciesTable from '../../components/species/SpeciesTable'
import SpeciesDetail from '../../components/species/SpeciesDetail'
import SpeciesEditor from '../../components/species/SpeciesEditor'

const species = [
  {
    name: 'Ceanothus',
    otherCommonNames: 'Small Leaf Mountain Lilac, Wortleaf Lilac',
    scientificName: 'Ceanothus papillosus var. roweanus',
    taxon: {
      Kingdom: 'Plantae',
      Family: 'Oleaceae'
    },
    description: `The olive, known by the botanical name Olea europaea, meaning "European olive", 
is a species of small tree in the family Oleaceae, 
found traditionally in the Mediterranean Basin. 

The species is cultivated in all the countries of the Mediterranean, as well as in South America, 
South Africa, Australia, New Zealand and the United States.

Olea europaea is the type species for the genus Olea.

The olive's fruit, also called the olive, is of major agricultural importance in the Mediterranean region as the source of olive oil; it is one of the core ingredients in Mediterranean cuisine. The tree and its fruit give their name to the plant family, which also includes species such as lilacs, jasmine, Forsythia, and the true ash trees (Fraxinus). 
`,
    habit: 'shrub', // ( tree, bush, etc)
    native: 'introduced', //  ( native, heirloom, introduced, exotic )
    soils: [], //
    uses: {
      medicinal: '',
      wood: '',
      other: 'Windbreak or Hedge'
    },
    imageUrl: 'https://garden.org/pics/2015-03-07/Henhouse/4aadc0-300.jpg',
    sun: ['Full Sun', 'Partial Shade'],
    pollination: [],
    tags: ['flower', 'evergreen'],
    lifeCycle: 'Perennial',
    size: {
      height: '6 feet',
      spread: '8 feet'
    },
    Leaves: 'Evergreen',
    flowers: 'Showy',
    flowerColour: 'Blue',
    flowerTime: ['Spring', 'Late spring', 'Early summer'],
    Resistances: 'Drought tolerant'
  },
  {
    name: 'Olive',
    otherCommonNames: '',
    scientificName: 'Olea europaea',
    taxon: {
      Kingdom: 'Plantae',
      Family: 'Oleaceae'
    },
    description: `The olive, known by the botanical name Olea europaea, meaning "European olive", 
is a species of small tree in the family Oleaceae, 
found traditionally in the Mediterranean Basin. 

The species is cultivated in all the countries of the Mediterranean, as well as in South America, 
South Africa, Australia, New Zealand and the United States.

Olea europaea is the type species for the genus Olea.

The olive's fruit, also called the olive, is of major agricultural importance in the Mediterranean region as the source of olive oil; it is one of the core ingredients in Mediterranean cuisine. The tree and its fruit give their name to the plant family, which also includes species such as lilacs, jasmine, Forsythia, and the true ash trees (Fraxinus). 
`,
    habit: 'tree', // ( tree, bush, etc)
    native: 'introduced', //  ( native, heirloom, introduced, exotic )
    soils: [], //
    uses: {
      medicinal: '',
      wood: '',
      other: ''
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Olivesfromjordan.jpg',
    sun: [],
    pollination: [],
    tags: ['edible', 'fruit', 'evergreen', 'oil', 'firewood', 'mediterranean']
  }
]

const Page = () => {
  return (
    <>
      <div>
        <SpeciesEditor />
        <SpeciesTable species={species} />
        <SpeciesDetail species={species[0]} />
        <SpeciesDetail species={species[1]} />
      </div>
    </>
  )
}

export default Page
