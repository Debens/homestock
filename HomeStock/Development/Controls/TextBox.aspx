<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TextBox.aspx.cs" Inherits="HomeStock.Development.Library.Controls.TextBoc" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    <Control:PageHeader runat="server" Title="TextBox" Description="Below is a various set of different possible TextBox configurations" />
    
    <Control:TextBox runat="server" ID="tbx" />

    <Control:Button runat="server" Text="Default" ID="Button3" Type="Default"/>

    <Control:TextBox runat="server" ID="tbxLbl" Label="First Name" />
    
    <Control:TextBox runat="server" ID="tbxLblTag" Label="First Name" Tag="Enter Your First Name Here"/>

    <Control:TextBox runat="server" ID="tbxLblTagPH" Label="Last Name" Tag="Enter Your Last Name Here" Placeholder="Placeholder Text..." />
</asp:content>