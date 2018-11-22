//
//  ViewController.swift
//  exercise-01
//
//  Created by Martin Walsh on 22/11/2018.
//  Copyright © 2018 Auth0. All rights reserved.
//

import UIKit
import Auth0

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func actionLogin(_ sender: Any) {
        Auth0
            .webAuth()
            .scope("openid profile")
            .audience("https://yourtenant.auth0.com/userinfo")
            .logging(enabled: true)
            .start { result in
                switch(result) {
                case .success(let credentials):
                    print("Authentication Success: \(credentials)")
                case .failure(let error):
                    print("Authentication Failed: \(error)")
                }
        }
    }
    
}

