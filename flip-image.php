<?php
/*
Plugin Name: Flip Image
Description: A Gutenberg block for creating flip cards with an image, title, and description.
Version: 1.0
Author: Bhautik Radiya
Author URI: https://bhautikradiya.com
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function flip_image_register_block() {
    wp_register_script(
        'flip-image-block',
        plugins_url('blocks/flip-image.js', __FILE__),
        array('wp-blocks', 'wp-editor', 'wp-components', 'wp-element', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'blocks/flip-image.js')
    );

    register_block_type('flip-image/block', array(
        'editor_script' => 'flip-image-block',
        'render_callback' => 'flip_image_render_callback',
        'attributes' => array(
            'imageUrl' => array('type' => 'string', 'default' => ''),
            'title' => array('type' => 'string', 'default' => 'Flip Title'),
            'description' => array('type' => 'string', 'default' => 'Flip Description'),
        )
    ));
}

function flip_image_render_callback($attributes) {
    $imageUrl = esc_url($attributes['imageUrl']);
    $title = esc_html($attributes['title']);
    $description = esc_html($attributes['description']);

    ob_start(); ?>
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="<?php echo $imageUrl; ?>" alt="<?php echo $title; ?>" style="width:300px;height:300px;">
            </div>
            <div class="flip-card-back">
                <h1><?php echo $title; ?></h1>
                <p><?php echo $description; ?></p>
            </div>
        </div>
    </div>
    <?php return ob_get_clean();
}

add_action('init', 'flip_image_register_block');

function flip_image_enqueue_assets() {
    wp_enqueue_style('flip-image-style', plugins_url('assets/style.css', __FILE__));
}

add_action('wp_enqueue_scripts', 'flip_image_enqueue_assets');
?>
