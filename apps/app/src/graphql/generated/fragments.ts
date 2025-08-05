
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AuthResult": [
      "GqlError",
      "UnauthenticatedError",
      "Verified"
    ],
    "HomeOrError": [
      "GqlError",
      "Home",
      "HomeNotFoundError"
    ],
    "IError": [
      "GqlError"
    ],
    "IngredientOrError": [
      "GqlError",
      "Ingredient"
    ],
    "InventoryOrError": [
      "GqlError",
      "Inventory"
    ],
    "StockOrError": [
      "GqlError",
      "Stock"
    ],
    "StoreOrError": [
      "GqlError",
      "Store"
    ],
    "StoresOrError": [
      "GqlError",
      "Stores"
    ]
  }
};
      export default result;
    