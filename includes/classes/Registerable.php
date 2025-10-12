<?php
/**
 * Standardised interface for loading classes within this theme.
 *
 * @package Abhainn
 */

namespace Abhainn;

/**
 * Interface Registerable
 */
interface Registerable {

	/**
	 * Determines if this class can be registered.
	 *
	 * @return bool
	 */
	public function can_register();

	/**
	 * Hooks for the actions and filters used by the inheriting class.
	 *
	 * @return void
	 */
	public function register();
}
