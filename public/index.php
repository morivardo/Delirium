<!DOCTYPE html>

<html lang="it">

<head>
  <meta charset="utf-8" />
  <title>Delirium - Home</title>
  <meta name="description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Abel&family=Roboto:wght@700&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
</head>

<body>

  <?php

  $request = $_SERVER['REQUEST_URI'];

  switch (true) {
    case empty($request):
      echo '<script type="text/JavaScript">
              let doc = "index";';
      break;
    case str_ends_with($request, '/'):
      echo '<script type="text/JavaScript">
              let doc = "index";';
      break;
    case str_ends_with($request, '/index'):
      echo '<script type="text/JavaScript">
              let doc = "index";';
      break;
    case str_ends_with($request, '/delirium'):
      echo '<script type="text/JavaScript">
              let doc = "delirium";';
      break;
    case str_ends_with($request, '/accesso'):
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
    case str_ends_with($request, '/beauty-zentrum'):
      echo '<script type="text/JavaScript">
              let doc = "beauty-zentrum";';
      break;
    case str_ends_with($request, '/traume-hotel'):
      echo '<script type="text/JavaScript">
              let doc = "traume-hotel";';
      break;
    default:
      require $request;
      break;
  }

  echo 'if (screen.width > 1200) {
            if (doc == "index") {
              window.location.replace("/" + doc + ".html");
            } else {
              window.location.replace("/views/" + doc + "/" + doc + ".html");
            }
          } else if (screen.width <= 1200 && screen.width > 600) {
            window.location.replace("/views/" + doc + "/t-" + doc + ".html");
          } else if (screen.width <= 600) {
            window.location.replace("/views/" + doc + "/m-" + doc + ".html");
          }

        </script>';

  ?>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>