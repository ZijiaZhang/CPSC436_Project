import {echo} from "../src/Echo";
import {expect} from "chai";

describe("Scheduler Test", function () {


    it("Should echo test string", function () {
        expect(echo("test")).equals("test")

    });
});
