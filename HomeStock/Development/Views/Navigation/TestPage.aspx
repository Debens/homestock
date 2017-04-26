<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestPage.aspx.cs" Inherits="HomeStock.Development.Views.Navigation.TestPage" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">

    <Control:Button runat="server" Text="Empty Page" Url="EmptyPage.aspx" />

</asp:content>