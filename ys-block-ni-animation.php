<?php
/**
 * Plugin Name:       [YS]ブロックにアニメーションを追加するプラグイン
 * Description:       ブロック単位で簡単なアニメーションを追加するプラグイン。ブロックの設定にアニメーションのオプションが追加されます。
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Version:           0.3.0
 * Author:            yosiakatsuki
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ys-block-ni-animation
 *
 * @package ys-block-ni-animation
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// ビルド済みのプラグインかチェック
if ( ! file_exists( __DIR__ . '/build/block.json' ) ) {
	add_action(
		'admin_notices',
		function () {
			wp_admin_notice(
				'「[YS]ブロックにアニメーションを追加するプラグイン」は正しくビルドされていないため機能が停止しています。<br>ソースファイルを取得した場合はビルドしてください。',
				[
					'type'        => 'error',
					'dismissible' => true,
				]
			);
		}
	);

	return;
}

add_action(
	'init',
	function () {
		register_block_type( __DIR__ . '/build' );
	}
);
add_action(
	'wp_enqueue_scripts',
	function () {
		// スクリプト.
		$path = '/build/view.js';
		wp_enqueue_script(
			'ysbna-script',
			plugins_url( $path, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $path ),
			[ 'in_footer' => true ]
		);
		// スタイル.
		$path = '/build/style-index.css';
		wp_enqueue_style(
			'ysbna-style',
			plugins_url( $path, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $path )
		);
		wp_style_add_data( 'ysbna-style', 'path', plugin_dir_path( __FILE__ ) . $path );
	}
);
add_filter(
	'register_block_type_args',
	function ( $args ) {
		$attributes      = [];
		$block_json_path = __DIR__ . '/build/block.json';
		// block.jsonを取得.
		if ( file_exists( $block_json_path ) ) {
			$block_json = wp_json_file_decode( $block_json_path, [ 'associative' => true ] );
			// 読み込めた？ & attributesある？.
			if ( $block_json && is_array( $block_json ) && isset( $block_json['attributes'] ) ) {
				$attributes = $block_json['attributes'];
			}
		}
		// 設定のマージ.
		if ( ! empty( $attributes ) ) {
			$args['attributes'] = array_merge( $args['attributes'], $attributes );
		}

		return $args;
	}
);
