'use strict';


angular.module('app')

 .controller('RecipesController', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {



   // Inject services needed when page loads
   dataService.getAllRecipes(function(response){
     $scope.allRecipes = response.data;
   });

   dataService.getAllCategories(function(response){
     $scope.allCategories = response.data;
   });


   // Check for recipe matches when user changes select menu
   $scope.checkforresults = function(selection) {
     // Reset noresults when user changes select menu
     $scope.noresults = false;
     console.log(selection);
     var counter = 0;
     for (var i=0; i<$scope.allRecipes.length; i++) {
       if ($scope.allRecipes[i].category == selection) {
         counter++;
       }
     }
     // If there are no matches and select menu isn't set to All Categories,
     if (counter==0 && (selection)) {
       $scope.noresults = true;
     }
   }

  //  $scope.loadView2 = function(clickedRecipe){
  //    console.log(clickedRecipe);
  //    $scope.id = clickedRecipe;
  //    $location.path('/edit/'+ clickedRecipe);
   //
  //  }

   // Load detail view when Add Recipe button is clicked
   $scope.loadAddRecipeView = function(){
     $location.path('/add');
   }

   // Delete recipe when Delete button is clicked
   $scope.deletedRecipe = function($index) {
     $scope.deleteId = $scope.allRecipes[$index]._id;
     (console.log($scope.allRecipes[$index]._id));

     dataService.deleteRecipe($scope.deleteId, function(response){
  //     $scope.deleteRecipe = response.data;
       (console.log($scope.allRecipes[$index]._id));
       (console.log(response));

       // Then, must make call to recipes API again to get refreshed list?
       dataService.getAllRecipes(function(response){
         $scope.allRecipes = response.data;
       });
     });
   }



}]);


   // Filter recipes DO I NEED THIS?
  // $scope.selectedcategory = $scope.allCategories.name;

  //  dataService.getAllRecipesInCategory(function(response){
  //    $scope.allRecipesInCategory = response.data;
  //  });