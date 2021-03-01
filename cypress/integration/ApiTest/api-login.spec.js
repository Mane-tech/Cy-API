describe('Sign up with api',  function() {
    it('verify sign up with api', function () {
        cy.server();
        cy.request('POST', 'https://api.demoblaze.com/signup',
            {
                username: 'xikec70686@geeky86.com',
                password: 'password20'
            });
        });


    it('verify log in ', function () {

        cy.visit('https://www.demoblaze.com/index.html');
        cy.server();
        cy.route('POST', 'https://api.demoblaze.com/viewcart').as('viewcart');
        // log in via ui
        cy.get('#login2').click();
        cy.get('#loginusername').type('xikec70686@geeky85.com');
        cy.get('#loginpassword').type('password20');
        cy.get('[class="btn btn-primary"]').last().click();
        cy.get('h4 [href="prod.html?idp_=1"]').then(res => {
        cy.request({
                method:'POST',
                url: 'https://api.demoblaze.com/addtocart',
                headers: {
                'content-type': 'application/json',
                'accept': '*/*',
                'x-cloud-trace-context': '4703b559990fe8204b537e4c3c0a155b'
             },
                body: {
                cookie: 'user=bfc096c4-f401-c5c1-90dd-e27a2f1178cf',
                flag: false,
                id: '8e5bf0ab-9fb4-882b-4238-4c294cd50203',
                prod_id: 1
                }});
        });
        // view cart
        cy.request({
            method:'POST',
            url: 'https://api.demoblaze.com/viewcart',
            headers: {
                    'content-type': 'application/json',
                    'accept': '*/*',
                    'x-cloud-trace-context': '7a7980ed382b47508002cf5abe369d2b'
                },
            body: {
             cookie: 'user=bfc096c4-f401-c5c1-90dd-e27a2f1178cf',
             id: '7e4391c7-651a-5744-9f21-2dc5d6623e7b',
             prod_id: 1
         }});
        // view product
        cy.request({
            method:'POST',
            url: 'https://api.demoblaze.com/view',
            headers: {
            'content-type': 'application/json',
            'accept': '*/*',
            'x-cloud-trace-context': 'e27738d98fe3cc122c50725b680b905a'
            },
            body: {
              cat: 'phone',
              desc: 'The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.',
              id: 1,
              img: 'imgs/galaxy_s6.jpg',
              price: 360.0,
              title:'Samsung galaxy s6'
        }});

        cy.visit('https://www.demoblaze.com/cart.html');
        // wait
        cy.wait('@viewcart');
        cy.contains('Samsung galaxy s6').should('be.visible');
        cy.request('POST', 'https://api.demoblaze.com/deletecart',
         {
             cookie: 'xikec70686@geeky85.com'
         });
        cy.visit('https://www.demoblaze.com/cart.html');
    });

    it('verify products with api', function () {
        // visit notebook section
        cy.request('POST', 'https://api.demoblaze.com/bycat',
            {
                cat: 'notebook'
            });
        // add product to cart
        cy.request('POST', 'https://api.demoblaze.com/addtocart',
            {
                cookie: 'eGlrZWM3MDY4NkBnZWVreTg1LmNvbTE2MTQ4NDM=',
                flag: true,
                id: '040831dd-6bc7-28b8-2de6-036ae7cddf5f',
                prod_id: 11
            });
        cy.visit('https://www.demoblaze.com/cart.html');
        // view cart
        cy.request('POST', 'https://api.demoblaze.com/viewcart',
            {
                 cookie: 'user=bfc096c4-f401-c5c1-90dd-e27a2f1178cf',
                 id: '7e4391c7-651a-5744-9f21-2dc5d6623e7b',
                 prod_id: 11
            });
        // view product
        cy.request('POST', 'https://api.demoblaze.com/view',
            {
                cat: 'notebook',
                desc: '1.6GHz dual-core Intel Core i5 (Turbo Boost up to 2.7GHz) with 3MB shared L3 cache Configurable to 2.2GHz dual-core Intel Core i7 (Turbo Boost up to 3.2GHz) with 4MB shared L3 cache.',
                id: 11,
                img: 'imgs/macbook_air.jpg',
                price: 700.0,
                title: 'MacBook air'
            });
        cy.wait('@viewcart');
        cy.visit('https://www.demoblaze.com/cart.html');
        // verify product visibility
        cy.contains('MacBook air').should('be.visible');
        // place order
        cy.request('POST', 'https://api.demoblaze.com/deleteitem',
            {
                id: '040831dd-6bc7-28b8-2de6-036ae7cddf5f'
            });
        cy.visit('https://www.demoblaze.com/cart.html');
        // add product to cart
        cy.request('POST', 'https://api.demoblaze.com/addtocart',
            {
                cookie: 'eGlrZWM3MDY4NkBnZWVreTg1LmNvbTE2MTQ4NTQ=',
                flag: true,
                id: '8d1dff71-1266-4236-3c8b-91414cbae666',
                prod_id: 5
            });
        // view cart
        cy.request('POST', 'https://api.demoblaze.com/viewcart',
            {
                cookie: 'user=bfc096c4-f401-c5c1-90dd-e27a2f1178cf',
                id: '7e4391c7-651a-5744-9f21-2dc5d6623e7b',
                prod_id: 5
            });
        cy.visit('https://www.demoblaze.com/cart.html');
        // verify product visibility
        cy.contains('Iphone 6 32gb').should('be.visible');

    });
});
