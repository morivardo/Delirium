 <?php

  $request = $_SERVER['REQUEST_URI'];

  switch (true) {
    case empty($request):
      echo '<script type="text/JavaScript">
              let doc = "home";';
      break;
    case str_ends_with($request, '/'):
      echo '<script type="text/JavaScript">
              let doc = "home";';
      break;
    case str_ends_with($request, '/index'):
      echo '<script type="text/JavaScript">
              let doc = "home";';
      break;
    case str_ends_with($request, '/home'):
      echo '<script type="text/JavaScript">
              let doc = "home";';
      break;
    case str_ends_with($request, '/delirium'):
      echo '<script type="text/JavaScript">
              let doc = "delirium";';
      break;
    case str_ends_with($request, 'accesso'):
      echo '<script type="text/JavaScript">
              let doc = "accesso";';
      break;
    case str_ends_with($request, '/piaceri'):
      echo '<script type="text/JavaScript">
              let doc = "piaceri";';
      break;
    case str_ends_with($request, '/community'):
      echo '<script type="text/JavaScript">
              let doc = "community";';
      break;
    case str_ends_with($request, '/scopri'):
      echo '<script type="text/JavaScript">
              let doc = "scopri";';
      break;
    case str_ends_with($request, '/beautyzentrum'):
      echo '<script type="text/JavaScript">
              let doc = "beautyzentrum";';
      break;
    case str_ends_with($request, '/traumehotel'):
      echo '<script type="text/JavaScript">
              let doc = "traumehotel";';
      break;
    default:
      require $request;
      break;
  }

  echo '  
        console.log("porco dio");
        setTimeout(function () {

         if (window.innerWidth > 1200) {
            window.location.replace("/views/" + doc + "/" + doc + ".html");
          } else if (window.innerWidth <= 1200 && window.innerWidth > 600) {
            window.location.replace("/views/" + doc + "/t-" + doc + ".html");
          } else if (window.innerWidth <= 600) {
            window.location.replace("/views/" + doc + "/m-" + doc + ".html");
          }
        }, 1000);
        </script>';

       // echo $request;
