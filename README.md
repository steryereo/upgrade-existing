# upgrade-existing

Upgrade only npm packages that are already top-level dependencies.

This is convenient if you have a monorepo that updates many packages at once, and you get a list of all those updates, but your app only uses a subset of the updated packages

## Installation

`npm i -g @steryereo/upgrade-existing`

## Usage

`upgrade-existing @mycompany/package1 @mycompany/package2 @mycompany/package3`
