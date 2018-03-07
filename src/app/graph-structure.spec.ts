import { HttpModule } from '@angular/http';

import {
    inject,
    TestBed
} from '@angular/core/testing';

import { GraphService } from './graph-service';
import { GraphApiVersions } from "./base";
import { parseMetadata, constructGraphLinksFromFullPath } from "./graph-structure";

let graphService:GraphService;
describe('Graph structural tests', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [GraphService]
    });
  });

  it('Creates an instance of the graph service', inject([GraphService], (_graphService:GraphService) => {
    graphService = _graphService;
  }));

  for (let version of GraphApiVersions) {
    it(`should download ${version} metadata and build the graph structures(Entity,EntitySet,SingleTon) from it`, function(done) {
        return parseMetadata(graphService, version).then(done);
    });
  }

  

  it("https://graph.microsoft.com/v1.0/me => [user]", function() {
    let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/v1.0/me");

    expect(links.length).toBe(1)
    expect(links[0].type).toBe("microsoft.graph.user")
  });

  


    it("https://graph.microsoft.com/v1.0/me/drive/quota => [user] -> [drive] -> [drive quoata]", function() {
    let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/drive/quota");
    expect(links.length).toBe(3)

    expect(links[0].type).toBe("microsoft.graph.user")
    expect(links[0].isACollection).toBe(false)

    expect(links[1].type).toBe("microsoft.graph.drive")
    expect(links[1].isACollection).toBe(false)

    expect(links[2].type).toBe("microsoft.graph.quota")
    expect(links[2].isACollection).toBe(false)
    expect(links[2].tagName).toBe("Property")

    });

    it("https://graph.microsoft.com/v1.0/users/foobar@contoso.com/calendar => [users] -> [user] -> [calendar]", function() {
    let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/v1.0/users/foobar@contoso.com/calendar");
    expect(links.length).toBe(3)

    expect(links[0].type).toBe("microsoft.graph.user")
    expect(links[0].isACollection).toBe(true)

    expect(links[1].type).toBe("microsoft.graph.user")
    expect(links[1].isACollection).toBe(false)
    expect(links[1].name).toBe("foobar@contoso.com")

    expect(links[2].type).toBe("microsoft.graph.calendar")
    expect(links[2].isACollection).toBe(false)

    });

    it("https://graph.microsoft.com/beta/me/photos/ => [user] -> [profilePhoto collection]", function() {
    let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/photos/");
    expect(links.length).toBe(2)

    expect(links[0].type).toBe("microsoft.graph.user")
    expect(links[0].isACollection).toBe(false)

    expect(links[1].type).toBe("microsoft.graph.profilePhoto")
    expect(links[1].isACollection).toBe(true)

    });
    

    it("https://graph.microsoft.com/beta/me/photos/x/width => [user] -> [profilePhoto collection] -> [profilePhoto] -> [width property]", function() {
        let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/photos/x/width");
        expect(links.length).toBe(4)

        expect(links[0].type).toBe("microsoft.graph.user")
        expect(links[0].isACollection).toBe(false)

        expect(links[1].type).toBe("microsoft.graph.profilePhoto")
        expect(links[1].isACollection).toBe(true)

        
        expect(links[2].type).toBe("microsoft.graph.profilePhoto")
        expect(links[2].isACollection).toBe(false)
        expect(links[2].name).toBe("x")

        expect(links[3].name).toBe("width")
        expect(links[3].type).toBe("Edm.Int32")
        expect(links[3].tagName).toBe("Property")
    });

    it("https://graph.microsoft.com/beta/me/city => [microsoft.graph.user] -> [city property]", function() {
        let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/city");
        expect(links.length).toBe(2)

        expect(links[0].type).toBe("microsoft.graph.user")
        expect(links[0].isACollection).toBe(false)
        expect(links[0].tagName).toBe("Singleton")

        expect(links[1].tagName).toBe("Property")
        expect(links[1].isACollection).toBe(false)
        expect(links[1].name).toBe("city")
        expect(links[1].type).toBe("Edm.String")
    });

    
    it("https://graph.microsoft.com/beta/me/drive/quota => [user] -> [drive] -> [drive quoata]", function() {
        let links = constructGraphLinksFromFullPath("https://graph.microsoft.com/beta/me/drive/quota");
        expect(links.length).toBe(3)

        expect(links[0].type).toBe("microsoft.graph.user")
        expect(links[0].isACollection).toBe(false)

        expect(links[1].type).toBe("microsoft.graph.drive")
        expect(links[1].isACollection).toBe(false)

        expect(links[2].type).toBe("microsoft.graph.quota")
        expect(links[2].isACollection).toBe(false)
        expect(links[2].tagName).toBe("Property")

    });
});