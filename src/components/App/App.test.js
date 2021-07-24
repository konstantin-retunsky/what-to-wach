import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

it("first snapshot test", () => {
	renderer.create(<App />).toJSON();
});
