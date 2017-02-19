<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Buttons.aspx.cs" Inherits="HomeStock.Testing.Library.Controls.Buttons" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    
    <Control:Button runat="server" Text="Google" ID="test" Url="http://google.com" OpenTab="true" />
    <Control:Button runat="server" Text="Google" ID="Button1" Url="http://google.com" OpenTab="true" Type="New" />
    <Control:Button runat="server" Text="Google" ID="Button2" Url="http://google.com" OpenTab="true" Type="Delete" />

</asp:content>