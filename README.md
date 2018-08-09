# GradientAngleFinder

Small demo using react-native to find the angle of a gradient.

![IOS Screengrab](src/assets/gradient_sh.png)

**This project requires JDK8. If you have a higher version, be sure to apply to proper JDK in the project structure.**

### To Run:
* Clone repo
* CD into repo folder
* `npm install`
* IOS - `react-native run-ios`
* Android - `react-native run-android`
* `react-devtools` to run the optional dev tools


**If you are running into issue switching from IOS > Android and vice versa, try running `npm start -- -- reset cache` to clear your cache.**

#### Libraries Used:
* [react-native](https://facebook.github.io/react-native/)
* [react-devtools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools)
* [react-native-elements](https://react-native-training.github.io/react-native-elements/)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-native-svg](https://github.com/react-native-community/react-native-svg)
* [react-native-text-gradient](https://github.com/iyegoroff/react-native-text-gradient)


**Note: There is a known issue with the text gradient package. To get around this, view [their fix](https://github.com/iyegoroff/react-native-text-gradient#usage-with-rn--0560).**

#### TODOs:
* Have animated path update the css value underneath the gradient.
* Have gradient visually update with the angle.
* Get drag and drop working on path ends so user can make their own angles.
* Add color picker to make own gradient
