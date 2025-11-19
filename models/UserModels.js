import pool from '../models/db.js';
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const getUser = async (id) => {
    if (parseInt(id) == NaN) {
        throw new Error('Invalid id');
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [id]);
}

export const createUser = async (email, password) => {
    if (email === '') {
        throw new Error('Invalid Email');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid Email Format');
    }

    const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [email]);

    if (user.length === 1) {
        const error = new Error(`The email ${email} is already used.`);
        error.statusCode = 400;
        throw error;
    }

    if (password === '') {
        throw new Error('Invalid Password');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password too weak');
    }

    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    const [newUser] = await pool.query(
        "INSERT INTO tbluser(email, password) VALUES(?, ?)",
        [email, newPassword]
    );

    return newUser.insertId;
}

export const login = async (email, password) => {
    if (email == '' || password === '') {
        throw new Error('Email and Password are required');
    }

    const [user] = await pool.query("SELECT * FROM tbluser WHERE email = ?", [email]);
    if (user.length === 0) {
        throw new Error(`An account with email: ${email} does not exist.`);
    }

    if (!bcrypt.compareSync(password, user[0].password)) {
        throw new Error('Incorrect password');
    }

    // Generate token
    const token = jwt.sign({ id: user[0].id }, process.env.SECRET, { expiresIn: '1h' });

    return token;
}
