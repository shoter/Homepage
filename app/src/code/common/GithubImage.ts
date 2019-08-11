import React, {Component} from "react";

export function GetGithubImagePath(filename: string) : string
{
    return `https://raw.githubusercontent.com/shoter/Homepage/master/media/${filename}`;
}