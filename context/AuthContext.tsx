'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithFacebook: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true);

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    };


    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } finally {
            setLoading(false);
        }
    };

    const loginWithFacebook = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, facebookProvider);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    // useEffect(() => {
    //     logout()
    // },[])

    return (
        <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, loginWithFacebook, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useFirebaseAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useFirebaseAuth must be used within FirebaseAuthProvider");
    }
    return context;
};
