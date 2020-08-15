# About The Ruru House Herbarium

This is something I built for my beloved.

The goal is to track all the plants and trees we put into our garden. Their species, what type of soil, water and sun they like, when planted, how they are growing, how they have been treated and how they are producing - whether wood or fruit.

# Data Model
## Species
The Species record represents a type of plant

  * Species Latin Name
  * Common name
  * Type ( tree, bush, etc)
  * Native NZ ( native, introduced, exotic )
  * Soil Types []
  * Uses []
  * Sun types []
  * Pollination
  * Keywords

Some of these fields accept rich text in markdown or pasted html. 

# Plant
The plant record represents an individual plant 

## Static Properties
Static properties are either intrinsic to the plant or set once.

* Species
* Planted date
* Location
* Purchased from
* Irrigation 


## Observable Properties
Observable properties are things we can record from time to time. All observations include the date.
* Flowering time
* Fruiting time
* Total fruit
* Leaf fall
* Soil moisture observation
* Soil acidity observation
* Current height
	


## Activity Events
Events record things we do to the plant
* Staked
* Sprayed
* Mulched
* Acidity treatment
* Pruned
* pollarded

