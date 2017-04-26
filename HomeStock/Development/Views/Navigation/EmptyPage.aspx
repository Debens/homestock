<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EmptyPage.aspx.cs" Inherits="HomeStock.Development.Views.Navigation.EmptyPage" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    <Control:Button runat="server" Text="Navigate" Url="TestPage.aspx" />
</asp:content>
