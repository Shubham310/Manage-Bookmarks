angular.module('Angular', [
  
])
  .controller('MainCtrl', ['$scope', function ($scope) {
      $scope.categories = [
          {"id": 0, "name": "Development"},
          {"id": 1, "name": "Design"},
          {"id": 2, "name": "Exercise"},
          {"id": 3, "name": "Humor"}
      ];

      $scope.bookmarks = [
          {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
          {"id": 1, "title": "Javascript", "url": "http://js.org", "category": "Development" },
          {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
          {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
          {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
          {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
          {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
          {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
          {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
      ];

      $scope.currentCategory = null;
      function setCurrentCategory(category){
        $scope.currentCategory = category;
        cancelCreating();
        cancelEditing();
      }

      function isCurrentCategory(category){
        return $scope.currentCategory!=null && category.name === $scope.currentCategory.name;
      }
      //to make public setcurrentCategory
      $scope.setCurrentCategory = setCurrentCategory;
      $scope.isCurrentCategory = isCurrentCategory;

      //CRUD
      function resetCreateForm(){
        $scope.newBookmark = {
          title:'',
          url:'',
          category: $scope.currentCategory
        }
      }

      function createBookmark(bookmark){
        bookmark.id = $scope.bookmarks.length;
        bookmark.category = $scope.currentCategory.name;
        $scope.bookmarks.push(bookmark);

        resetCreateForm();
      }
      $scope.createBookmark = createBookmark;
      $scope.editedBookmark = null;

      function setEditedBookmark(bookmark){
        $scope.editedBookmark = angular.copy(bookmark);

      }
      $scope.setEditedBookmark = setEditedBookmark;

      function updateBookmark(updatebookmark){
        var index;
        //console.log(updatebookmark.category);
        for(index=0; index<$scope.bookmarks.length; index++){

          if(updatebookmark.id == $scope.bookmarks[index].id){
            break;
          }

        }
        $scope.bookmarks[index] = updatebookmark;
        $scope.editedBookmark = null;
        $scope.isEditing = false;
      }
      $scope. updateBookmark = updateBookmark;

      function isSelectedBookmark(bookmarkId){
        return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
      }
      $scope.isSelectedBookmark = isSelectedBookmark;

      function deleteBookmark(bookmark){
        var index = $scope.bookmarks.indexOf(bookmark);
        $scope.bookmarks.splice(index, 1);
      }
      $scope.deleteBookmark = deleteBookmark;

      //Editing And Creating States
      $scope.isCreating = false;
      $scope.isEditing = false;

      function startCreating(){
        $scope.isCreating = true;
        $scope.isEditing = false;
        resetCreateForm();
      }
      function startEditing(){
        $scope.isEditing = true;
        $scope.isCreating = false;
      }

      function cancelEditing(){
        $scope.isEditing = false;
      }
      function cancelCreating(){
        $scope.isCreating = false;
      }

      function shouldShowCreating(){
        return $scope.currentCategory && !$scope.isEditing;
      }

      function shouldShowEditing(){
        return $scope.isEditing && !$scope.isCreating;
      }

      $scope.shouldShowCreating = shouldShowCreating;
      $scope.shouldShowEditing = shouldShowEditing;
      $scope.cancelCreating = cancelCreating;
      $scope.cancelEditing = cancelEditing;
      $scope.startEditing = startEditing;
      $scope.startCreating = startCreating;

  }])
;
