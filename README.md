<p align="center">
    <img src="images/icon-128.png" alt="VTT Observe" />
</p>

# VTT Observe
[![Push check](https://github.com/Ghifari160/vtt-observe/actions/workflows/push.yaml/badge.svg)](https://github.com/Ghifari160/vtt-observe/actions/workflows/push.yaml)

[Chrome](https://www.google.com/chrome/) extension to remove Roll20 UIs for observer account.

## Using the extension

As of [v0.2.0](https://github.com/Ghifari160/vtt-observe/releases/tag/v0.2.0), this extension is
available through the [Chrome Web Store](https://chrome.google.com/webstore/detail/vtt-observe/oeekmbjfcokjhbhddfenmcjfapmlolii).
If you prefer to install VTT Observe as an unpacked extension, you can [build](#building) the
extension or download the prebuilt unpacked extension from the [release](https://github.com/ghifari160/vtt-observe/releases/latest).
Then, navigate to `chrome://extensions`, enable developer mode.
Finally, add the `out`directory (if building from source) or the **unzipped** extensions (if
downloading prebuilt) as an unpacked extension.

~~Currently, there is no prebuilt version of this extension available.~~
~~This may change in the future, though I wouldn't hold your breath.~~

~~For now, you can [build](#building) the extension and load it to your Chrome profile as an unpacked
extension.~~
~~To do so, navigate to `chrome://extensions`, enable developer mode, and add the `out` directory as
an unpacked extension.~~

## Building

VTT Observe requires [Node v19](https://nodejs.org/) and any version of
[NPM](https://www.npmjs.com/).

First, install dependencies.

``` shell
npm i
```

Then, build the _unpacked_ extension.

``` shell
npm run build
```

## Cleaning up

Simply run the cleanup script,

``` shell
npm run clean
```

or, the full cleanup script to additionally remove all generated scripts.

``` shell
npm run fullclean
```

## License

VTT Observe is distributed under the terms of the [MIT License](LICENSE), with exceptions to the
VTT Observe Logo.
You may use the VTT Observe Logo for purposes of identifying this project.
All other use of the Logo is prohibited.

VTT Observe is not affiliated with Roll20.
Roll20 is a registered trademark of The Orr Group, LLC.
