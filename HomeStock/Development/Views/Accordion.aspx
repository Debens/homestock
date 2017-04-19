<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Accordion.aspx.cs" Inherits="HomeStock.Development.Library.View.Accordion" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    
    <Control:PageHeader runat="server" Title="Accordion" Description="Below is an example of an accordion list. It's not really an accordion as you can have more than one open at a time, but hey ho." />

    <Control:AccordionList runat="server" >
        <Content>
            <Control:TextBox runat="server" ID="tbx" Label="The Label" />
            <Control:TextBox runat="server" ID="TextBox1" Label="The Label" Tag="Hi, I'm a tbx" />
            <Control:Button runat="server" Text="Button 1" />
            <Control:Button runat="server" Text="Button 2" />
        </Content>
    </Control:AccordionList>

</asp:content>