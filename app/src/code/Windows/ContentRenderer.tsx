import React, { Component } from "react";

export default abstract class ContentRenderer 
{

    abstract renderContent() : JSX.Element | null;
    

}