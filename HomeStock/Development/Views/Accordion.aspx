<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Accordion.aspx.cs" Inherits="HomeStock.Development.Library.View.Accordion" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    
    <Control:PageHeader runat="server" Title="Button" Description="Below is a various set of different possible button configurations" />

    <Control:AccordionList runat="server" />

</asp:content>