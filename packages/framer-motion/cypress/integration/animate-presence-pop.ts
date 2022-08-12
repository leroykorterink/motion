interface BoundingBox {
    top: number
    left: number
    width: number
    height: number
}

function expectBbox(element: HTMLElement, expectedBbox: Partial<BoundingBox>) {
    const bbox = element.getBoundingClientRect()
    expect(bbox.left).to.equal(expectedBbox.left)
    expect(bbox.top).to.equal(expectedBbox.top)
    expectedBbox.width && expect(bbox.width).to.equal(expectedBbox.width)
    expectedBbox.height && expect(bbox.height).to.equal(expectedBbox.height)
}

describe("AnimatePresence popLayout", () => {
    it("correctly pops exiting elements out of the DOM", () => {
        cy.visit("?test=animate-presence-pop")
            .wait(50)
            .get("#a")
            .should(([$a]: any) => {
                expectBbox($a, {
                    top: 100,
                    left: 100,
                    width: 100,
                    height: 100,
                })
            })
            .get("#b")
            .should(([$a]: any) => {
                expectBbox($a, {
                    top: 200,
                    left: 100,
                    width: 100,
                    height: 100,
                })
            })
            .trigger("click", 60, 60, { force: true })
            .wait(100)
            .get("#a")
            .should(([$a]: any) => {
                expectBbox($a, {
                    top: 100,
                    left: 100,
                    width: 100,
                    height: 100,
                })
            })
            .get("#b")
            .should(([$a]: any) => {
                expectBbox($a, {
                    top: 100,
                    left: 100,
                    width: 100,
                    height: 100,
                })
            })
            .trigger("click", 60, 60, { force: true })
            .wait(100)
            .get("#a")
            .should(([$a]: any) => {
                expectBbox($a, {
                    top: 100,
                    left: 100,
                    width: 100,
                    height: 100,
                })
            })
            .get("#b")
            .should(([$a]: any) => {
                expectBbox($a, {
                    top: 200,
                    left: 100,
                    width: 100,
                    height: 100,
                })
            })
    })
})
