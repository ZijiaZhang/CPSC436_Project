import {echo} from "../src/backend/Echo";
import {expect} from "chai";

describe("Scheduler Test", function () {


    it("Should echo test string", function () {
        expect(echo("test")).equals("test")

    });
});
