//
//  ViewController.swift
//  exercise-03
//
//  Created by Martin Walsh on 22/11/2018.
//  Copyright © 2018 Auth0. All rights reserved.
//

import UIKit
import Auth0

class ViewController: UIViewController {
    
    private var refreshToken: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func actionLogin(_ sender: Any) {
        Auth0
            .webAuth()
            .scope("openid profile offline_access")
            .logging(enabled: true)
            .start { response in
                switch(response) {
                case .success(let result):
                    print("Authentication Success")
                    print("Access Token: \(result.accessToken ?? "No Access Token Found")")
                    print("ID Token: \(result.idToken ?? "No ID Token Found")")
                    self.refreshToken = result.refreshToken
                case .failure(let error):
                    print("Authentication Failed: \(error)")
                }
        }
    }
    
    @IBAction func actionRefresh(_ sender: Any) {
        guard let refreshToken = self.refreshToken else {
            print("No Refresh Token found")
            return
        }
        
        Auth0
            .authentication()
            .logging(enabled: true)
            .renew(withRefreshToken: refreshToken)
            .start { response in
                switch(response) {
                case .success(let result):
                    print("Refresh Success")
                    print("Access Token: \(result.accessToken ?? "No Access Token Found")")
                case .failure(let error):
                    print("Authentication Failed: \(error)")
                }
        }
        
    }
}

