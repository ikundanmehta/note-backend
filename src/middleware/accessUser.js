const express = require("express");
const Notes = require("../models/notes");

const AdminAccess = async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log(req.params.id);
    const notes = await Notes.findById(req.params.id);

    if (notes.createdBy.toString() === userId.toString()) {
      req.adminAccess = true;
    } else {
      if (
        notes.permissions === "admin" &&
        (notes.isPublic || notes.privateAccess.find(userId.toString()))
      ) {
        req.adminAccess = true;
      } else if (
        notes.permissions === "read" &&
        (notes.isPublic || notes.privateAccess.find(userId.toString()))
      ) {
        req.adminAccess = false;
        req.readAccess = true;
      } else {
        req.adminAccess = false;
        req.readAccess = false;
      }
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { AdminAccess };
