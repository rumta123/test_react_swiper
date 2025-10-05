<?php /* Template Name: frontPage */ ?>
<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="<?php echo get_template_directory_uri(); ?>/dist/vite.svg" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

    <!-- CSS сборки React -->
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/dist/assets/index-CtHzTJKF.css">

    <title><?php bloginfo('name'); ?> — React App</title>

    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <div id="root"></div>

    <!-- JS сборки React -->
    <script type="module" src="<?php echo get_template_directory_uri(); ?>/dist/assets/index-BICtndX8.js"></script>

    <?php wp_footer(); ?>
  </body>
</html>
